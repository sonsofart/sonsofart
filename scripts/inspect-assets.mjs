import fs from 'node:fs/promises';
import sharp from 'sharp';
const m = JSON.parse(await fs.readFile('src/data/media.json', 'utf8'));
const keys = [
  '1.gif',
  'fabian4.gif',
  'Spuma-Deep-Jackin-Lukso-Fam-UNREVEALED.png',
  '4.png',
  'gif-winged.gif',
  'road-map.png',
  'cropped-logo-sons-con-spazio-2.png',
];
const images = await Promise.all(
  keys.map(async (k, i) => ({
    input: await sharp('public' + m[k].poster)
      .resize(280, 280, { fit: 'contain', background: '#bbbbbb' })
      .png()
      .toBuffer(),
    left: (i % 4) * 280,
    top: Math.floor(i / 4) * 280,
  })),
);
await fs.mkdir('artifacts', { recursive: true });
await sharp({ create: { width: 1120, height: 560, channels: 3, background: '#333333' } })
  .composite(images)
  .png()
  .toFile('artifacts/original-artwork-sheet.png');
const pages = JSON.parse(await fs.readFile('research/pages.json', 'utf8'));
console.log(
  pages
    .find((p) => p.route === '/nft-iconic-lukso-family-game/')
    .links.filter((l) => l.url?.includes('pdf')),
);
