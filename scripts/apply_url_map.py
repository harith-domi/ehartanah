#!/usr/bin/env python3
"""
apply_url_map.py
After process_watermarks.py finishes, run this to patch all JSON data files
in src/lib/data/ with the new Supabase Storage URLs.

Usage:
    python scripts/apply_url_map.py
    python scripts/apply_url_map.py --dry-run   (shows stats without writing)
"""

import argparse
import json
from pathlib import Path

ROOT     = Path(__file__).parent.parent
DATA_DIR = ROOT / 'src/lib/data'
MAP_FILE = ROOT / 'scripts/photo_url_map.json'

parser = argparse.ArgumentParser()
parser.add_argument('--dry-run', action='store_true', help='Show stats without writing files')
args = parser.parse_args()

if not MAP_FILE.exists():
    raise SystemExit(f'ERROR: {MAP_FILE} not found. Run process_watermarks.py first.')

url_map: dict[str, str] = json.loads(MAP_FILE.read_text(encoding='utf-8'))
print(f'URL map loaded: {len(url_map):,} entries')

TARGET_FILES = [
    DATA_DIR / 'sale-listings.json',
    DATA_DIR / 'rent-listings.json',
    DATA_DIR / 'auction-listings.json',
]

total_replaced = 0

for path in TARGET_FILES:
    if not path.exists():
        print(f'  SKIP (not found): {path.name}')
        continue

    data = json.loads(path.read_text(encoding='utf-8'))
    replaced = 0

    for item in data:
        # Patch photos array
        if 'photos' in item and isinstance(item['photos'], list):
            new_photos = [url_map.get(p, p) for p in item['photos']]
            replaced += sum(1 for o, n in zip(item['photos'], new_photos) if o != n)
            item['photos'] = new_photos

        # Patch thumbnailUrl
        for key in ('thumbnailUrl', 'thumbnail_url'):
            if key in item and isinstance(item[key], str):
                old = item[key]
                item[key] = url_map.get(old, old)
                if item[key] != old:
                    replaced += 1

    total_replaced += replaced
    print(f'  {path.name}: {replaced:,} URLs replaced')

    if not args.dry_run:
        path.write_text(json.dumps(data, ensure_ascii=False), encoding='utf-8')

print(f'\nTotal URLs replaced: {total_replaced:,}')
if args.dry_run:
    print('(Dry run — no files written)')
else:
    print('Done. Rebuild and deploy the site:\n  vercel --prod\n  vercel alias <url> ehartanahmalaysia.com')
