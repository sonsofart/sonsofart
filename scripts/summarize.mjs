import fs from 'node:fs';
import { load } from 'cheerio';
const pages = JSON.parse(fs.readFileSync('research/pages.json', 'utf8'));
for (const p of pages) {
  const $ = load(p.html || '');
  console.log('\nPAGE', p.route, '\n', p.text.replace(/\s+/g, ' ').slice(0, 26000));
  console.log(
    '\nIMAGES',
    $('img')
      .map((_, i) => ({ alt: $(i).attr('alt'), src: $(i).attr('src') }))
      .get()
      .slice(0, 35),
  );
  console.log(
    '\nOTHER LINKS',
    p.links
      .filter((l) => !l.url?.includes('sonsofart.it') && !l.url?.includes('universal.page'))
      .slice(0, 30),
  );
}
