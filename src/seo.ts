import { projects, routeMeta } from './data/content';
import media from './data/media.json';
export function getSeo(url: string, origin: string) {
  const meta = routeMeta[url] || {
    title: 'Page not found | Sons of Art',
    description: 'Explore the Sons of Art creative universe.',
  };
  const project = projects.find((p) => url === '/' + p.slug + '/');
  const art = media[(project?.image || '1.gif') as keyof typeof media];
  const image = origin + art.poster;
  const graph: object[] = [
    {
      '@type': 'WebSite',
      '@id': origin + '/#website',
      url: origin + '/',
      name: 'Sons of Art',
      inLanguage: 'en',
      description: routeMeta['/'].description,
    },
    {
      '@type':
        url === '/nfts-2-0/' ? 'CollectionPage' : url === '/contact/' ? 'ContactPage' : 'WebPage',
      '@id': origin + url + '#webpage',
      url: origin + url,
      name: meta.title,
      description: meta.description,
      inLanguage: 'en',
      isPartOf: { '@id': origin + '/#website' },
    },
  ];
  if (url !== '/' && routeMeta[url])
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' },
        { '@type': 'ListItem', position: 2, name: meta.title.split(' | ')[0], item: origin + url },
      ],
    });
  if (project)
    graph.push({
      '@type': 'CreativeWork',
      name: project.name,
      description: project.description,
      url: origin + url,
      image,
      genre: project.category,
      inLanguage: 'en',
    });
  if (url === '/nfts-2-0/')
    graph.push({
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: origin + '/' + p.slug + '/',
      })),
    });
  return { meta, image, jsonld: { '@context': 'https://schema.org', '@graph': graph } };
}
