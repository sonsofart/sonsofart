import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App';
import { routeMeta } from './data/content';
import { getSeo } from './seo';
export { routeMeta };
export function render(url: string, origin: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
  return { html, ...getSeo(url, origin) };
}
