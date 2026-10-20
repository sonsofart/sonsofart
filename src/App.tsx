import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import { Header, Footer, PrivacyPanel, CookieNotice } from './components';
import {
  Home,
  Projects,
  ProjectDetail,
  Roadmap,
  Contact,
  Support,
  GameExamples,
  Legal,
  NotFound,
} from './pages';
import { projects, routeMeta } from './data/content';
import { getSeo } from './seo';
import { hasSavedPrivacyNotice, savePrivacyNotice } from './privacy';
export function App() {
  const [privacy, setPrivacy] = useState(false);
  const [notice, setNotice] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const origin = canonical ? new URL(canonical.href).origin : window.location.origin;
    const { meta, image, jsonld } = getSeo(location.pathname, origin);
    document.title = meta.title;
    const setMeta = (attr: string, name: string, value: string) => {
      let node = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!node) {
        node = document.createElement('meta');
        node.setAttribute(attr, name);
        document.head.appendChild(node);
      }
      node.content = value;
    };
    setMeta('name', 'description', meta.description);
    setMeta(
      'name',
      'robots',
      routeMeta[location.pathname]
        ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
        : 'noindex,follow',
    );
    for (const [key, value] of Object.entries({
      'og:title': meta.title,
      'og:description': meta.description,
      'og:url': origin + location.pathname,
      'og:image': image,
    }))
      setMeta('property', key, value);
    for (const [key, value] of Object.entries({
      'twitter:title': meta.title,
      'twitter:description': meta.description,
      'twitter:image': image,
    }))
      setMeta('name', key, value);
    if (canonical) canonical.href = origin + location.pathname;
    const schema = document.querySelector('script[type="application/ld+json"]');
    if (schema) schema.textContent = JSON.stringify(jsonld);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    try {
      setNotice(!hasSavedPrivacyNotice(localStorage));
    } catch {
      setNotice(true);
    }
  }, []);
  function rememberNotice() {
    savePrivacyNotice();
    setNotice(false);
    setPrivacy(false);
  }
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nfts-2-0/" element={<Projects />} />
            <Route path="/roadmap/" element={<Roadmap />} />
            <Route path="/contact/" element={<Contact />} />
            <Route path="/support-faq/" element={<Support />} />
            <Route path="/game-simulation/" element={<GameExamples />} />
            {projects.map((p) => (
              <Route
                key={p.slug}
                path={'/' + p.slug + '/'}
                element={<ProjectDetail key={p.slug} project={p} />}
              />
            ))}
            {(['privacy', 'cookies', 'terms'] as const).map((kind) => (
              <Route key={kind} path={'/' + kind + '/'} element={<Legal kind={kind} />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer onPrivacy={() => setPrivacy(true)} />
        {notice && !privacy && (
          <CookieNotice
            onAccept={rememberNotice}
            onSettings={() => setPrivacy(true)}
            onDismiss={() => setNotice(false)}
          />
        )}
        <PrivacyPanel
          open={privacy}
          onClose={() => {
            setPrivacy(false);
            setNotice(false);
          }}
          onRemember={rememberNotice}
        />
      </MotionConfig>
    </LazyMotion>
  );
}
