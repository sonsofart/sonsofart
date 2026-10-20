import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

const origin = 'https://sonsofart.it';
await fs.mkdir('research', { recursive: true });
await fs.mkdir('public/images', { recursive: true });
const queue = ['/'];
const visited = new Set();
const pages = [];
const assets = new Map();
while (queue.length && visited.size < 60) {
  const route = queue.shift();
  if (visited.has(route)) continue;
  visited.add(route);
  try {
    const res = await fetch(origin + route);
    if (!res.ok) {
      console.log('PAGE FAILED', route, res.status);
      continue;
    }
    const html = await res.text();
    const $ = load(html);
    const main = $('main').length ? $('main') : $('.site-content');
    const links = $('a[href]')
      .map((_, a) => ({ text: $(a).text().trim(), url: $(a).attr('href') }))
      .get();
    for (const link of links) {
      try {
        const u = new URL(link.url, origin);
        if (
          u.origin === origin &&
          !u.search &&
          !/\.(jpg|png|webp|pdf|xml|svg|zip)$/i.test(u.pathname) &&
          !/wp-|feed|author|category|tag/.test(u.pathname) &&
          !visited.has(u.pathname)
        )
          queue.push(u.pathname);
      } catch {}
    }
    const imageUrls = new Set();
    $('img').each((_, el) => {
      const s = $(el).attr('data-src') || $(el).attr('src');
      if (s && !s.startsWith('data:')) imageUrls.add(new URL(s, origin).href);
      const ss = $(el).attr('srcset') || '';
      for (const x of ss.split(',')) {
        if (x.trim()) imageUrls.add(new URL(x.trim().split(' ')[0], origin).href);
      }
    });
    for (const match of html.matchAll(
      /(?:https?:)?(?:\\\/|\/){2}sonsofart\.it(?:[^\s"'<>]*?)(?:\.(?:jpg|jpeg|png|webp|gif|svg|mp4))/gi,
    ))
      imageUrls.add(match[0].replaceAll('\\/', '/'));
    const images = [];
    for (let url of imageUrls) {
      url = url.replaceAll('&amp;', '&');
      if (!assets.has(url))
        assets.set(
          url,
          '/images/' +
            decodeURIComponent(new URL(url).pathname.split('/').pop()).replace(
              /[^a-zA-Z0-9._-]/g,
              '-',
            ),
        );
      images.push({ url, local: assets.get(url) });
    }
    const text = main
      .text()
      .replace(/[\t ]+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
    pages.push({ route, title: $('title').text(), text, links, images, html: main.html() });
    await fs.writeFile('research/' + (route.replaceAll('/', '_') || 'home') + '.html', html);
    console.log('PAGE', route, images.length);
  } catch (e) {
    console.log('ERROR', route, e.message);
  }
}
await fs.writeFile('research/pages.json', JSON.stringify(pages, null, 2));
await fs.writeFile('research/assets.json', JSON.stringify(Object.fromEntries(assets), null, 2));
const entries = [...assets];
let cursor = 0;
await Promise.all(
  Array.from({ length: 5 }, async () => {
    while (cursor < entries.length) {
      const [url, local] = entries[cursor++];
      try {
        const dest = 'public' + local;
        try {
          await fs.access(dest);
          continue;
        } catch {}
        const res = await fetch(url);
        if (!res.ok) throw Error(String(res.status));
        await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
      } catch (e) {
        console.log('ASSET FAILED', url, e.message);
      }
    }
  }),
);
console.log('DONE', pages.length, 'pages', assets.size, 'assets');
