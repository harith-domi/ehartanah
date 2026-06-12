/**
 * Mudah.my Photo Scraper
 * ---------------------
 * Visits each Mudah listing page, extracts real photo URLs,
 * and saves them back into rent-listings.json / sale-listings.json
 *
 * Usage:
 *   node scripts/scrape-mudah-photos.js              → all listings, 1 req/sec
 *   node scripts/scrape-mudah-photos.js --limit 200  → first 200 only
 *   node scripts/scrape-mudah-photos.js --resume     → skip already-scraped IDs
 *   node scripts/scrape-mudah-photos.js --apply      → write photos into the JSON files
 *
 * Run without --apply first to test. When happy, add --apply to write to data files.
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
const path = require('path');

// ─── Config ────────────────────────────────────────────────────────────────
const DELAY_MS = 2000;          // ms between batches (slower = fewer Cloudflare blocks)
const CONCURRENCY = 3;          // parallel requests at a time
const MAX_PHOTOS = 5;           // max photos to store per listing
const RESULTS_FILE = path.join(__dirname, 'mudah-photos-results.json');

const RENT_FILE = path.join(__dirname, '../src/lib/data/rent-listings.json');
const SALE_FILE = path.join(__dirname, '../src/lib/data/sale-listings.json');

const args = process.argv.slice(2);
const LIMIT      = (() => { const i = args.indexOf('--limit');  return i >= 0 ? parseInt(args[i+1]) : Infinity; })();
const SHOULD_RESUME = args.includes('--resume');
const SHOULD_APPLY  = args.includes('--apply');
const VERBOSE       = args.includes('--verbose');

// ─── Session cookie (scripts/mudah-cookie.txt — NOT committed to git) ──────
const COOKIE_FILE = path.join(__dirname, 'mudah-cookie.txt');
const COOKIE = fs.existsSync(COOKIE_FILE)
  ? fs.readFileSync(COOKIE_FILE, 'utf8').trim()
  : '';

// Parse "name=value; name2=value2" into Puppeteer cookie objects
function parseCookies(cookieString) {
  return cookieString
    .split(';')
    .map(pair => pair.trim())
    .filter(Boolean)
    .map(pair => {
      const eq = pair.indexOf('=');
      if (eq < 0) return null;
      return {
        name: pair.slice(0, eq).trim(),
        value: pair.slice(eq + 1).trim(),
        domain: '.mudah.my',
        path: '/',
      };
    })
    .filter(Boolean);
}

// ─── Browser (shared across all requests) ───────────────────────────────────
let browser = null;

async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
  }
  return browser;
}

// ─── Load data ──────────────────────────────────────────────────────────────
function loadListings() {
  const rent = JSON.parse(fs.readFileSync(RENT_FILE, 'utf8'));
  const sale = JSON.parse(fs.readFileSync(SALE_FILE, 'utf8'));
  return { rent, sale };
}

// ─── Load existing results (for --resume) ──────────────────────────────────
function loadResults() {
  if (fs.existsSync(RESULTS_FILE)) {
    return JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
  }
  return {};
}

// ─── Save results to disk (incremental) ────────────────────────────────────
function saveResults(results) {
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2), 'utf8');
}

// ─── Extract image URLs from a Mudah listing page ──────────────────────────
async function fetchPhotos(id, url) {
  let page = null;
  try {
    const b = await getBrowser();
    page = await b.newPage();

    // Block heavy resources — we only need the HTML/scripts, not actual images
    await page.setRequestInterception(true);
    page.on('request', req => {
      const type = req.resourceType();
      if (type === 'image' || type === 'media' || type === 'font') {
        req.abort();
      } else {
        req.continue();
      }
    });

    if (COOKIE) {
      await page.setCookie(...parseCookies(COOKIE));
    }

    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Give the Cloudflare JS challenge a chance to resolve (first request only, usually)
    try {
      await page.waitForFunction(() => !document.title.includes('Just a moment'), { timeout: 20000 });
    } catch {
      if (VERBOSE) console.error(`  ✗ ${id} → cloudflare challenge stuck`);
      return { id, photos: [], status: 'cf-challenge' };
    }

    const httpStatus = res ? res.status() : 0;
    if (httpStatus >= 400 && httpStatus !== 403) {
      if (VERBOSE) console.error(`  ✗ ${id} → HTTP ${httpStatus}`);
      return { id, photos: [], status: String(httpStatus) };
    }

    // Expired listings redirect to a category/search page — detect and skip,
    // otherwise we'd save photos that belong to other listings
    if (!page.url().includes(String(id))) {
      if (VERBOSE) console.error(`  ○ ${id} → expired (redirected to ${page.url().slice(0, 60)})`);
      return { id, photos: [], status: 'expired' };
    }

    // Extract the seller's description text (if present)
    const description = await page.evaluate(() => {
      // Mudah renders the ad body in a dedicated section; try common containers
      const candidates = [
        document.querySelector('[class*="description"]'),
        document.querySelector('[data-testid*="description"]'),
        document.querySelector('#ad_view_ad_highlights'),
      ].filter(Boolean);
      for (const el of candidates) {
        const text = (el.innerText || '').trim();
        if (text.length > 40) return text.slice(0, 2000);
      }
      return '';
    });

    // Extract every rnudah.com image URL from the rendered DOM + embedded JSON
    const photos = await page.evaluate(() => {
      const found = new Set();

      document.querySelectorAll('img').forEach(img => {
        for (const attr of ['src', 'data-src']) {
          const v = img.getAttribute(attr);
          if (v && v.includes('rnudah.com')) found.add(v);
        }
      });

      document.querySelectorAll('script').forEach(s => {
        const text = s.textContent || '';
        const matches = text.match(/https?:\/\/[^"'\s\\]*rnudah\.com[^"'\s\\]*/g);
        if (matches) matches.forEach(u => found.add(u));
      });

      const og = document.querySelector('meta[property="og:image"]');
      if (og && (og.getAttribute('content') || '').includes('rnudah.com')) {
        found.add(og.getAttribute('content'));
      }

      return [...found];
    });

    // Clean URLs — remove query strings, keep only .jpg/.png/.webp,
    // drop agency logo images (image_logo path)
    const cleaned = [...new Set(photos.map(u => u.split('?')[0].trim()))]
      .filter(u => /\.(jpe?g|png|webp)$/i.test(u))
      .filter(u => !u.includes('image_logo') && !u.includes('/avatar/') && !u.includes('/grids/'))
      .slice(0, MAX_PHOTOS);

    return { id, photos: cleaned, description, status: 'ok' };

  } catch (err) {
    const status = err.message?.slice(0, 60) || 'error';
    if (VERBOSE) console.error(`  ✗ ${id} → ${status}`);
    return { id, photos: [], status: String(status) };
  } finally {
    if (page) await page.close().catch(() => {});
  }
}

// ─── Process in batches with delay ─────────────────────────────────────────
async function processBatch(batch, results, done, total) {
  const promises = batch.map(({ id, url }) =>
    fetchPhotos(id, url).then(result => {
      results[id] = result;
      done.count++;
      const pct = Math.round((done.count / total) * 100);
      const found = result.photos.length;
      const symbol = found > 0 ? '✓' : '○';
      process.stdout.write(`\r[${pct}%] ${done.count}/${total} | ${symbol} ${id} — ${found} photo(s)   `);
      return result;
    })
  );
  await Promise.all(promises);
}

// ─── Apply results back into JSON files ────────────────────────────────────
function applyPhotosToJson(results) {
  const { rent, sale } = loadListings();

  let updated = 0;

  function patch(listings) {
    return listings.map(l => {
      const r = results[l.id];
      if (r && (r.photos.length > 0 || r.description)) {
        updated++;
        return {
          ...l,
          ...(r.photos.length > 0 && { thumbnailUrl: r.photos[0], photos: r.photos }),
          ...(r.description && { description: r.description }),
        };
      }
      return l;
    });
  }

  const patchedRent = patch(rent);
  const patchedSale = patch(sale);

  // Write BOM-free UTF-8
  fs.writeFileSync(RENT_FILE, JSON.stringify(patchedRent, null, 2), { encoding: 'utf8' });
  fs.writeFileSync(SALE_FILE, JSON.stringify(patchedSale, null, 2), { encoding: 'utf8' });

  console.log(`\n✓ Applied photos to ${updated} listings`);
  console.log(`  rent-listings.json → ${patchedRent.filter(l => l.photos?.length).length} with photos`);
  console.log(`  sale-listings.json → ${patchedSale.filter(l => l.photos?.length).length} with photos`);
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Mudah Photo Scraper');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // If --apply only, skip scraping and apply existing results
  if (SHOULD_APPLY && fs.existsSync(RESULTS_FILE)) {
    const results = loadResults();
    const scraped = Object.keys(results).length;
    const withPhotos = Object.values(results).filter(r => r.photos?.length > 0).length;
    console.log(`Applying ${scraped} scraped results (${withPhotos} with photos)...`);
    applyPhotosToJson(results);
    return;
  }

  const { rent, sale } = loadListings();
  const all = [...rent, ...sale].filter(l => l.url && l.url.includes('mudah.my'));

  // Load existing results if resuming.
  // cf-challenge / error entries are NOT treated as done — they get retried.
  const results = SHOULD_RESUME ? loadResults() : {};
  const alreadyDone = new Set(
    SHOULD_RESUME
      ? Object.values(results)
          .filter(r => r.status === 'ok' || r.status === 'expired' || r.status === '410' || r.status === '404')
          .map(r => r.id)
      : []
  );

  // Build work queue
  let queue = all
    .filter(l => !alreadyDone.has(l.id))
    .map(l => ({ id: l.id, url: l.url }));

  if (isFinite(LIMIT)) queue = queue.slice(0, LIMIT);

  const total = queue.length;
  if (total === 0) {
    console.log('Nothing to scrape. All listings already processed.');
    if (SHOULD_RESUME) console.log('Use --apply to write photos into JSON files.');
    return;
  }

  const eta = Math.round((total * (DELAY_MS / CONCURRENCY)) / 60000);
  console.log(`Listings to scrape : ${total.toLocaleString()}`);
  console.log(`Concurrency        : ${CONCURRENCY} at a time`);
  console.log(`Delay between req  : ${DELAY_MS}ms`);
  console.log(`Estimated time     : ~${eta} minutes`);
  console.log(`Results file       : ${RESULTS_FILE}`);
  if (SHOULD_RESUME) console.log(`Resuming from      : ${alreadyDone.size} already done`);
  if (!SHOULD_APPLY) console.log(`\nRun with --apply when done to write photos into JSON.`);
  console.log('');

  const done = { count: 0 };
  const startTime = Date.now();

  // Process in batches
  for (let i = 0; i < queue.length; i += CONCURRENCY) {
    const batch = queue.slice(i, i + CONCURRENCY);
    await processBatch(batch, results, done, total);

    // Save after every batch (resume-safe)
    saveResults(results);

    // Delay between batches
    if (i + CONCURRENCY < queue.length) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  const withPhotos = Object.values(results).filter(r => r.photos?.length > 0).length;
  const failed = Object.values(results).filter(r => r.status !== 'ok').length;

  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Done in ${elapsed}s`);
  console.log(`  Listings scraped : ${Object.keys(results).length}`);
  console.log(`  With photos      : ${withPhotos}`);
  console.log(`  Failed / 404     : ${failed}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\nResults saved to: ${RESULTS_FILE}`);
  console.log('\nNext step → run with --apply to write photos into JSON files:');
  console.log('  node scripts/scrape-mudah-photos.js --resume --apply');
}

main()
  .then(async () => {
    if (browser) await browser.close();
  })
  .catch(async err => {
    console.error('\nFatal error:', err.message);
    if (browser) await browser.close();
    process.exit(1);
  });
