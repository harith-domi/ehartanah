#!/usr/bin/env python3
"""
process_watermarks.py
Download all Mudah photos, remove mudah.my watermark, upload to Supabase Storage.

Install deps:
    pip install easyocr opencv-python pillow requests supabase tqdm

For high-quality LaMa inpainting (recommended):
    pip install iopaint
    Then start IOPaint server in a separate terminal:
        iopaint start --model=lama --device=cpu --port=8080
    Then run with: python scripts/process_watermarks.py --method=lama

For fast CPU mode (no IOPaint needed):
    python scripts/process_watermarks.py --method=cv2

Required env vars (set in shell before running):
    set NEXT_PUBLIC_SUPABASE_URL=https://ehhjktuolhwdgpkcigsp.supabase.co
    set SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

Resume: safe to stop and restart — already-processed photos are skipped.
Output: scripts/photo_url_map.json  (old URL -> new Supabase URL)
Then run: python scripts/apply_url_map.py  to patch the JSON data files
"""

import argparse
import hashlib
import json
import os
import sys
import time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

import cv2
import numpy as np
import requests
from PIL import Image
import easyocr
from supabase import create_client
from tqdm import tqdm

# ── Paths ─────────────────────────────────────────────────────────────────────
ROOT        = Path(__file__).parent.parent
DATA_DIR    = ROOT / 'src/lib/data'
SCRIPTS_DIR = ROOT / 'scripts'
PROGRESS_F  = SCRIPTS_DIR / 'watermark_progress.json'
URL_MAP_F   = SCRIPTS_DIR / 'photo_url_map.json'
BUCKET      = 'photos'

# ── Args ──────────────────────────────────────────────────────────────────────
parser = argparse.ArgumentParser()
parser.add_argument('--method', choices=['lama', 'cv2'], default='lama',
                    help='lama = IOPaint server (better), cv2 = OpenCV inpaint (faster, no GPU)')
parser.add_argument('--lama-url', default='http://localhost:8080',
                    help='IOPaint server URL (only used with --method=lama)')
parser.add_argument('--workers', type=int, default=4,
                    help='Parallel download/upload workers')
parser.add_argument('--gpu', action='store_true',
                    help='Use GPU for EasyOCR (faster if CUDA available)')
parser.add_argument('--limit', type=int, default=0,
                    help='Process at most N photos (0 = all). Useful for testing.')
args = parser.parse_args()

# ── Supabase ──────────────────────────────────────────────────────────────────
SUPABASE_URL = os.environ.get('NEXT_PUBLIC_SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
if not SUPABASE_URL or not SUPABASE_KEY:
    sys.exit('ERROR: Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars first.')
sb = create_client(SUPABASE_URL, SUPABASE_KEY)

# ── EasyOCR (one instance, not thread-safe — used in main thread) ─────────────
print('Loading EasyOCR model (downloads ~150MB on first run)...')
reader = easyocr.Reader(['en'], gpu=args.gpu, verbose=False)
print('EasyOCR ready.')

# ── Helpers ───────────────────────────────────────────────────────────────────

def load_json(path: Path, default):
    if path.exists():
        return json.loads(path.read_text(encoding='utf-8'))
    return default

def save_json(path: Path, data):
    path.write_text(json.dumps(data, indent=2), encoding='utf-8')

def collect_all_photo_urls() -> list[str]:
    """Return all unique Mudah photo URLs from the JSON data files."""
    urls: set[str] = set()
    for fname in ('sale-listings.json', 'rent-listings.json', 'auction-listings.json'):
        items = load_json(DATA_DIR / fname, [])
        for item in items:
            for photo in item.get('photos', []):
                if isinstance(photo, str) and 'mudah' in photo.lower():
                    urls.add(photo)
            thumb = item.get('thumbnailUrl') or item.get('thumbnail_url')
            if isinstance(thumb, str) and 'mudah' in thumb.lower():
                urls.add(thumb)
    return sorted(urls)

def download_image(url: str, retries: int = 3) -> bytes | None:
    for attempt in range(retries):
        try:
            r = requests.get(url, timeout=20,
                             headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            if r.status_code == 200 and len(r.content) > 2000:
                return r.content
        except Exception:
            if attempt < retries - 1:
                time.sleep(1)
    return None

def build_watermark_mask(img_bgr: np.ndarray) -> np.ndarray:
    """Run EasyOCR, return a uint8 mask (255=watermark) covering 'mudah' text regions."""
    h, w = img_bgr.shape[:2]
    mask = np.zeros((h, w), dtype=np.uint8)
    try:
        results = reader.readtext(img_bgr)
    except Exception:
        return mask

    for (bbox, text, conf) in results:
        if 'mudah' in text.lower() and conf > 0.15:
            pts = np.array(bbox, dtype=np.int32)
            pad = 8  # pixels of padding around detected text
            x1 = max(0, pts[:, 0].min() - pad)
            y1 = max(0, pts[:, 1].min() - pad)
            x2 = min(w, pts[:, 0].max() + pad)
            y2 = min(h, pts[:, 1].max() + pad)
            mask[y1:y2, x1:x2] = 255
    return mask

def remove_watermark_cv2(img_bgr: np.ndarray, mask: np.ndarray) -> np.ndarray:
    """OpenCV Navier-Stokes inpainting — fast, decent quality."""
    return cv2.inpaint(img_bgr, mask, inpaintRadius=7, flags=cv2.INPAINT_NS)

def remove_watermark_lama(img_bgr: np.ndarray, mask: np.ndarray, lama_url: str) -> np.ndarray:
    """Send image + mask to IOPaint LaMa server, return inpainted result."""
    import io as _io
    # Encode image as PNG for the API
    ok_img, img_buf = cv2.imencode('.png', cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB))
    ok_msk, msk_buf = cv2.imencode('.png', mask)
    if not ok_img or not ok_msk:
        return remove_watermark_cv2(img_bgr, mask)

    try:
        resp = requests.post(
            f'{lama_url}/api/v1/inpaint',
            files={
                'image': ('image.png', img_buf.tobytes(), 'image/png'),
                'mask':  ('mask.png',  msk_buf.tobytes(), 'image/png'),
            },
            timeout=60,
        )
        if resp.status_code == 200:
            arr = np.frombuffer(resp.content, np.uint8)
            result = cv2.imdecode(arr, cv2.IMREAD_COLOR)
            if result is not None:
                return result
    except Exception:
        pass
    # Fallback to cv2 if server is unavailable
    return remove_watermark_cv2(img_bgr, mask)

def process_image(img_bytes: bytes) -> bytes:
    """Full pipeline: detect watermark → inpaint → return JPEG bytes."""
    arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
        return img_bytes

    mask = build_watermark_mask(img)

    if mask.max() == 0:
        # No watermark detected — return original bytes unchanged
        return img_bytes

    if args.method == 'lama':
        result = remove_watermark_lama(img, mask, args.lama_url)
    else:
        result = remove_watermark_cv2(img, mask)

    ok, buf = cv2.imencode('.jpg', result, [cv2.IMWRITE_JPEG_QUALITY, 92])
    return buf.tobytes() if ok else img_bytes

def storage_path(url: str) -> str:
    """Stable, unique storage path derived from original URL."""
    h = hashlib.md5(url.encode()).hexdigest()[:10]
    filename = url.split('?')[0].split('/')[-1]
    if not filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        filename += '.jpg'
    return f'{h}/{filename}'

def upload_photo(path: str, data: bytes) -> str | None:
    """Upload bytes to Supabase Storage, return public URL."""
    try:
        sb.storage.from_(BUCKET).upload(
            path, data,
            file_options={'content-type': 'image/jpeg', 'upsert': 'true'},
        )
        return sb.storage.from_(BUCKET).get_public_url(path)
    except Exception as e:
        print(f'\n  Upload error ({path}): {e}')
        return None

def ensure_bucket():
    try:
        sb.storage.create_bucket(BUCKET, options={'public': True})
        print(f"Created public Supabase Storage bucket '{BUCKET}'")
    except Exception:
        pass  # Already exists

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print('Collecting photo URLs from JSON data...')
    all_urls = collect_all_photo_urls()
    print(f'Found {len(all_urls):,} unique Mudah photo URLs')

    prog    = load_json(PROGRESS_F, {'done': [], 'failed': []})
    url_map = load_json(URL_MAP_F, {})
    done    = set(prog['done'] + list(url_map.keys()))

    remaining = [u for u in all_urls if u not in done]
    if args.limit > 0:
        remaining = remaining[:args.limit]

    print(f'Already done: {len(done):,}  |  To process: {len(remaining):,}')
    if not remaining:
        print('All done! Run python scripts/apply_url_map.py to update JSON data files.')
        return

    if args.method == 'lama':
        try:
            r = requests.get(f'{args.lama_url}/api/v1/model', timeout=5)
            print(f'IOPaint server ready ({args.lama_url}) — model: {r.json().get("name", "?")}')
        except Exception:
            print(f'WARNING: IOPaint server not reachable at {args.lama_url}')
            print('  Start it with: iopaint start --model=lama --device=cpu --port=8080')
            print('  Falling back to cv2 inpainting for this run.\n')
            args.method = 'cv2'

    ensure_bucket()

    bar = tqdm(total=len(remaining), unit='photo', dynamic_ncols=True)
    save_every = 50

    # Downloads happen in a thread pool; OCR + inpaint run in the main thread
    # (EasyOCR is not thread-safe). Upload happens in the thread pool after inpaint.
    def download_task(url: str) -> tuple[str, bytes | None]:
        return url, download_image(url)

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(download_task, u): u for u in remaining}
        # Keep a small in-memory queue by processing futures as they complete
        for fut in as_completed(futures):
            url, img_bytes = fut.result()
            try:
                if img_bytes is None:
                    prog['failed'].append(url)
                    bar.update(1)
                    continue

                cleaned = process_image(img_bytes)
                path    = storage_path(url)
                new_url = upload_photo(path, cleaned)

                if new_url:
                    url_map[url] = new_url
                    prog['done'].append(url)
                else:
                    prog['failed'].append(url)
            except Exception as e:
                prog['failed'].append(url)
                tqdm.write(f'Error on {url}: {e}')

            bar.update(1)

            if (len(prog['done']) + len(prog['failed'])) % save_every == 0:
                save_json(PROGRESS_F, prog)
                save_json(URL_MAP_F, url_map)

    bar.close()
    save_json(PROGRESS_F, prog)
    save_json(URL_MAP_F, url_map)

    print(f'\nDone! Processed {len(prog["done"]):,}  |  Failed {len(prog["failed"]):,}')
    print(f'URL map saved to {URL_MAP_F}')
    print('\nNext step: python scripts/apply_url_map.py')

if __name__ == '__main__':
    main()
