// Quick diagnostic: new-headless Chrome, no interception, full wait
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
const path = require('path');

const URL = process.argv[2] || 'https://www.mudah.my/nuri-court-apartment-5-min-hospital-ampang-jalan-kaki-lrt-chempaka-114815064.htm';
const COOKIE = fs.readFileSync(path.join(__dirname, 'mudah-cookie.txt'), 'utf8').trim();

function parseCookies(str) {
  return str.split(';').map(p => p.trim()).filter(Boolean).map(p => {
    const eq = p.indexOf('=');
    if (eq < 0) return null;
    return { name: p.slice(0, eq).trim(), value: p.slice(eq + 1).trim(), domain: '.mudah.my', path: '/' };
  }).filter(Boolean);
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setCookie(...parseCookies(COOKIE));

  const res = await page.goto(URL, { waitUntil: 'networkidle2', timeout: 45000 });
  console.log('Status:', res.status());
  console.log('Title :', await page.title());

  // Wait up to 25s for Cloudflare challenge to resolve
  try {
    await page.waitForFunction(() => !document.title.includes('Just a moment'), { timeout: 25000 });
  } catch { /* challenge did not resolve */ }
  await new Promise(r => setTimeout(r, 2000));
  console.log('Title after wait:', await page.title());
  console.log('URL now:', page.url());

  const imgs = await page.evaluate(() => {
    const found = new Set();
    document.querySelectorAll('img').forEach(i => {
      const s = i.getAttribute('src') || i.getAttribute('data-src') || '';
      if (s.includes('rnudah')) found.add(s);
    });
    document.querySelectorAll('script').forEach(s => {
      const m = (s.textContent || '').match(/https?:\/\/[^"'\s\\]*rnudah\.com[^"'\s\\]*/g);
      if (m) m.forEach(u => found.add(u));
    });
    return [...found].slice(0, 10);
  });
  console.log('Images found:', imgs.length);
  imgs.forEach(u => console.log(' ', u));

  const bodySnippet = await page.evaluate(() => document.body.innerText.slice(0, 300));
  console.log('\nBody snippet:\n', bodySnippet);

  await browser.close();
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
