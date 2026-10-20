import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { load } from 'cheerio';

const root = path.resolve('dist');
const failures = [];
let checks = 0;
function check(condition, message) {
  checks++;
  if (!condition) failures.push(message);
}
async function files(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await files(f)));
    else out.push(f);
  }
  return out;
}
let output;
try {
  output = await files(root);
} catch {
  throw Error('Build output missing. Run npm run build before npm run check.');
}
const pages = output.filter((f) => f.endsWith('.html'));
check(pages.length === 17, `Expected 16 public pages plus 404; found ${pages.length}`);
const titles = new Set();
const descriptions = new Set();
const localLinks = new Set();
const externalResources = [];
for (const file of pages) {
  const text = await fs.readFile(file, 'utf8');
  const $ = load(text);
  const name = path.relative(root, file);
  check($('html').attr('lang') === 'en', `${name}: missing English language declaration`);
  check($('main h1').length === 1, `${name}: expected one main H1`);
  check($('main').text().trim().length > 100, `${name}: prerendered content is missing`);
  check($('title').text().length > 8, `${name}: missing title`);
  check(!titles.has($('title').text()), `${name}: duplicate title`);
  titles.add($('title').text());
  const desc = $('meta[name="description"]').attr('content');
  check(!!desc && desc.length > 40, `${name}: missing description`);
  check(!descriptions.has(desc), `${name}: duplicate description`);
  descriptions.add(desc);
  check($('link[rel="canonical"]').length === 1, `${name}: missing canonical URL`);
  check(
    $('meta[property="og:title"]').length === 1 && $('meta[property="og:image"]').length === 1,
    `${name}: missing social metadata`,
  );
  check($('script[type="application/ld+json"]').length === 1, `${name}: missing JSON-LD`);
  try {
    const schema = JSON.parse($('script[type="application/ld+json"]').text());
    check(
      schema['@context'] === 'https://schema.org' && schema['@graph'].length >= 2,
      `${name}: invalid graph`,
    );
  } catch {
    check(false, `${name}: JSON-LD cannot be parsed`);
  }
  check(!/https?:\/\/(?:www\.)?universal\.page/i.test(text), `${name}: obsolete marketplace link`);
  check(!/art-placeholder/.test($('main').html() || ''), `${name}: unresolved artwork`);
  $('img').each((_, i) => {
    check($(i).attr('alt') !== undefined, `${name}: missing image alt`);
    check(!!$(i).attr('width') && !!$(i).attr('height'), `${name}: image dimensions missing`);
  });
  $('a[href],img[src],script[src],link[href]').each((_, e) => {
    const attr = e.name === 'a' || e.name === 'link' ? 'href' : 'src';
    const url = $(e).attr(attr);
    if (url?.startsWith('/') && !url.startsWith('//')) localLinks.add(url.split('#')[0]);
    if (e.name !== 'a' && e.name !== 'link' && /^https?:\/\//.test(url || ''))
      externalResources.push(url);
  });
  check($('iframe').length === 0, `${name}: third-party embed found`);
}
for (const href of localLinks) {
  if (!href) continue;
  const resolved = path.resolve(root, '.' + decodeURIComponent(href));
  check(resolved.startsWith(root), `Asset path outside build: ${href}`);
  try {
    const s = await fs.stat(resolved);
    if (s.isDirectory()) await fs.access(path.join(resolved, 'index.html'));
  } catch {
    check(false, 'Missing local target: ' + href);
  }
}
check(
  externalResources.length === 0,
  'Remote media/script dependencies: ' + externalResources.join(', '),
);
const galleries = JSON.parse(await fs.readFile('src/data/galleries.json', 'utf8'));
const legends = galleries['/winged-legends/'].filter((k) => /^\d+\.jpg$/.test(k));
check(
  legends.length === 998 && new Set(legends).size === 998,
  `Expected the 998 unique artworks actually published in the original gallery; found ${legends.length}`,
);
const media = JSON.parse(await fs.readFile('src/data/media.json', 'utf8'));
for (const [key, value] of Object.entries(media))
  for (const target of new Set([value.src, value.poster])) {
    try {
      await fs.access(path.join(root, target));
    } catch {
      check(false, 'Missing media: ' + key);
    }
  }
for (const f of ['instruction-manual.pdf', 'printable-deck.pdf', 'game-examples.pdf']) {
  const b = await fs.readFile('dist/documents/' + f);
  check(b.subarray(0, 5).toString() === '%PDF-', 'Invalid PDF signature: ' + f);
}
const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8');
const xml = load(sitemap, { xml: true });
check(xml('url').length === 16, 'Sitemap should list 16 routes');
const robots = await fs.readFile('dist/robots.txt', 'utf8');
check(
  robots.includes('Allow: /') && robots.includes('Sitemap: '),
  'Crawling or sitemap discovery is missing',
);
const llms = await fs.readFile('dist/llms.txt', 'utf8');
check(
  llms.includes('Lukso Family Game') && llms.includes('Contact'),
  'AI discovery summary missing',
);
check(
  !output.some((f) => /[\\/](Documenti|research|images)[\\/]/.test(f)),
  'Private research or unoptimized source assets are included in build',
);
const bytes = await Promise.all(output.map(async (f) => (await fs.stat(f)).size));
console.log(
  `Artifact audit: ${checks} checks across ${pages.length} HTML pages, ${Object.keys(media).length} artwork assets and 3 PDFs.`,
);
console.log(`Static output: ${(bytes.reduce((a, b) => a + b, 0) / 1024 / 1024).toFixed(1)} MiB.`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else
  console.log('All checks passed. No remote media dependencies or obsolete marketplace links.');
