import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const root = path.resolve('.');
const selected = JSON.parse(await fs.readFile('research/selected-assets.json', 'utf8'));
const original = JSON.parse(await fs.readFile('src/data/original.json', 'utf8'));
await fs.mkdir('public/media', { recursive: true });
const mapping = {};
let cursor = 0;
const entries = [...new Set(Object.values(selected))];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (cursor < entries.length) {
      const key = entries[cursor++];
      const file = path.resolve('public' + key);
      if (!file.startsWith(root + path.sep)) throw Error('Outside workspace');
      const hash = crypto.createHash('sha256').update(key).digest('hex').slice(0, 12);
      try {
        const metadata = await sharp(file).metadata();
        const gif = key.endsWith('.gif');
        const dest = '/media/' + hash + (gif ? '.gif' : '.webp');
        if (gif) await fs.copyFile(file, 'public' + dest);
        else
          await sharp(file)
            .rotate()
            .resize({
              width: /^\d+\.jpg$/.test(path.basename(key)) ? 800 : 1600,
              withoutEnlargement: true,
            })
            .webp({ quality: 80 })
            .toFile('public' + dest);
        let poster = dest;
        if (gif) {
          poster = '/media/' + hash + '-poster.webp';
          await sharp(file)
            .resize({ width: 1000, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toFile('public' + poster);
        }
        mapping[path.basename(key)] = {
          src: dest,
          poster,
          width: metadata.width,
          height: metadata.height,
        };
      } catch (e) {
        console.log('FAILED', key, e.message);
      }
    }
  }),
);
await fs.writeFile('src/data/media.json', JSON.stringify(mapping));
const galleries = Object.fromEntries(
  original.map((p) => [
    p.route,
    p.images.map((i) => path.basename(i.src)).filter((k) => mapping[k]),
  ]),
);
await fs.writeFile('src/data/galleries.json', JSON.stringify(galleries));
console.log('Optimized', Object.keys(mapping).length, 'assets');
