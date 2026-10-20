import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('.');
const source = path.resolve('public/images');
const target = path.resolve('research/source-assets');
if (!source.startsWith(root + path.sep) || !target.startsWith(root + path.sep))
  throw Error('Archive paths outside workspace');
await fs.mkdir(target, { recursive: true });
let count = 0;
for (const file of await fs.readdir(source)) {
  const from = path.resolve(source, file),
    to = path.resolve(target, file);
  if (!from.startsWith(source + path.sep) || !to.startsWith(target + path.sep))
    throw Error('Unexpected path');
  await fs.rename(from, to);
  count++;
}
console.log('Archived original files locally:', count);
