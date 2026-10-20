import fs from 'node:fs/promises';
import { load } from 'cheerio';
const pages = JSON.parse(await fs.readFile('research/pages.json', 'utf8'));
const allAssets = JSON.parse(await fs.readFile('research/assets.json', 'utf8'));
const content = [];
const selected = new Map();
for (const p of pages) {
  const $ = load(p.html || '');
  const images = [];
  $('img').each((_, i) => {
    const url = $(i).attr('src');
    if (!url || url.startsWith('data:')) return;
    const local = allAssets[url] || allAssets[encodeURI(url)];
    if (local) {
      images.push({ src: local, alt: $(i).attr('alt') || '' });
      selected.set(url, local);
    }
  });
  content.push({ route: p.route, text: p.text, images });
}
for (const [url, local] of Object.entries(allAssets))
  if (
    /alex-kotli|cropped-logo-sons|d-e170|l\.jpeg|DALL|road-map\.png/.test(url) &&
    !/-\d+x\d+\./.test(url)
  )
    selected.set(url, local);
await fs.mkdir('src/data', { recursive: true });
await fs.writeFile('src/data/original.json', JSON.stringify(content, null, 2));
await fs.writeFile(
  'research/selected-assets.json',
  JSON.stringify(Object.fromEntries(selected), null, 2),
);
console.log('Unique selected assets:', selected.size);
const entries = [...selected];
let cursor = 0;
const failures = [];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (cursor < entries.length) {
      const [url, local] = entries[cursor++];
      try {
        try {
          await fs.access('public' + local);
          continue;
        } catch {}
        const r = await fetch(url);
        if (!r.ok) throw Error(String(r.status));
        await fs.writeFile('public' + local, Buffer.from(await r.arrayBuffer()));
      } catch (e) {
        failures.push({ url, error: e.message });
      }
      if (cursor % 100 === 0) console.log('Downloaded', cursor, '/', entries.length);
    }
  }),
);
await fs.mkdir('public/documents', { recursive: true });
const pdfs = [
  ['https://sonsofart.it/LUKSO-FAMILY-GAME-Sons-of-Art.pdf', 'instruction-manual.pdf'],
  [
    'https://sonsofart.it/LUKSO-FAMILY-GAME-Sons-of-Art%20%E2%80%93%20Printable%20Deck.pdf',
    'printable-deck.pdf',
  ],
  ['https://sonsofart.it/examples.pdf', 'game-examples.pdf'],
];
for (const [url, file] of pdfs) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw Error(String(r.status));
    await fs.writeFile('public/documents/' + file, Buffer.from(await r.arrayBuffer()));
  } catch (e) {
    failures.push({ url, error: e.message });
  }
}
await fs.writeFile('research/download-failures.json', JSON.stringify(failures, null, 2));
console.log('Finished; failures:', failures);
