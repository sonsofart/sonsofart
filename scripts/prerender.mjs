import fs from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';
import { createRequire } from 'node:module';
const origin = (process.env.SITE_URL || 'https://sonsofart.it').replace(/\/$/, '');
if (!/^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(origin))
  throw Error('SITE_URL must be an HTTPS origin without a path.');
await fs.mkdir('artifacts', { recursive: true });
await build({
  entryPoints: ['src/entry-server.tsx'],
  outfile: 'artifacts/prerender.cjs',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
});
const escape = (s) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
{
  const require = createRequire(import.meta.url);
  const { render, routeMeta } = require(path.resolve('artifacts/prerender.cjs'));
  const template = await fs.readFile('dist/index.html', 'utf8');
  const routes = Object.keys(routeMeta);
  for (const route of [...routes, '/404/']) {
    const { html, meta, jsonld, image } = render(route, origin);
    const head = `<title>${escape(meta.title)}</title>\n<meta name="description" content="${escape(meta.description)}"/>\n<meta name="robots" content="${route === '/404/' ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}"/>\n<link rel="canonical" href="${origin + route}"/>\n<meta property="og:type" content="website"/><meta property="og:site_name" content="Sons of Art"/><meta property="og:locale" content="en_GB"/><meta property="og:title" content="${escape(meta.title)}"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:url" content="${origin + route}"/><meta property="og:image" content="${image}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(meta.title)}"/><meta name="twitter:description" content="${escape(meta.description)}"/><meta name="twitter:image" content="${image}"/><script type="application/ld+json">${JSON.stringify(jsonld).replaceAll('<', '\\u003c')}</script>`;
    const output = template
      .replace(/<title>.*?<\/title>/s, '')
      .replace(/<meta name="description"[^>]*>/, '')
      .replace('</head>', head + '\n</head>')
      .replace('<div id="root"></div>', '<div id="root">' + html + '</div>');
    const dest = route === '/404/' ? 'dist/404.html' : path.join('dist', route, 'index.html');
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, output);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((r) => `\n<url><loc>${origin + r}</loc></url>`).join('')}\n</urlset>`;
  await fs.writeFile('dist/sitemap.xml', sitemap);
  await fs.writeFile(
    'dist/robots.txt',
    `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
  );
  await fs.writeFile(
    'dist/llms.txt',
    `# Sons of Art\n\n> Independent hobby creative collective exploring art, music, games and NFT 2.0 on LUKSO.\n\nThis website is a portfolio and project archive. It does not provide minting, payments, investment services or wallet connections.\n\n## Pages\n${routes
      .filter((r) => !['/privacy/', '/cookies/', '/terms/'].includes(r))
      .map((r) => `- [${routeMeta[r].title}](${origin + r}): ${routeMeta[r].description}`)
      .join(
        '\n',
      )}\n\n## Contact\nEmail: nftsonsofart@gmail.com\n\n## Separate game\nLukso Family Game: https://luksofamilygame.sonsofart.it/\n\n## Legal information\n- [Privacy](${origin}/privacy/)\n- [Cookies](${origin}/cookies/)\n- [Terms and credits](${origin}/terms/)\n\nArtwork rights remain with their respective holders. This file is an informational aid, not a guarantee of AI discovery or a licence to reuse artwork.\n`,
  );
  console.log(`Prerendered ${routes.length} pages + 404. SEO origin: ${origin}`);
}
