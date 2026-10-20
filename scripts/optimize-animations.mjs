import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
sharp.cache(false);
const root = path.resolve('.');
const archive = path.resolve('research/animated-sources');
if (!archive.startsWith(root + path.sep)) throw Error('Invalid archive');
await fs.mkdir(archive, { recursive: true });
const media = JSON.parse(await fs.readFile('src/data/media.json', 'utf8'));
for (const [key, record] of Object.entries(media)) {
  if (!record.src.endsWith('.gif')) continue;
  const input = path.resolve('public' + record.src);
  const archived = path.resolve(archive, path.basename(record.src));
  if (!input.startsWith(root + path.sep) || !archived.startsWith(archive + path.sep))
    throw Error('Invalid media path');
  const output = record.src.replace('.gif', '-animated.webp');
  await sharp(input, { animated: true, limitInputPixels: false })
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 75, effort: 3 })
    .toFile('public' + output);
  console.log(key, (await fs.stat(input)).size, '->', (await fs.stat('public' + output)).size);
  record.src = output;
  await fs.rename(input, archived);
}
await fs.writeFile('src/data/media.json', JSON.stringify(media));
