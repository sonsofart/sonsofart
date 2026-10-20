import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { m, useReducedMotion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Plus,
  Minus,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import mediaData from './data/media.json';
import { projects, GAME_URL, EMAIL, COMMUNITY_URL, type Project } from './data/content';

type Media = { src: string; poster: string; width: number; height: number };
const media = mediaData as Record<string, Media>;
export function imageAsset(key: string) {
  return media[key] || Object.entries(media).find(([k]) => k.includes(key))?.[1];
}
export function Art({
  image,
  alt,
  className = '',
  eager = false,
  animated = false,
}: {
  image: string;
  alt: string;
  className?: string;
  eager?: boolean;
  animated?: boolean;
}) {
  const reduce = useReducedMotion();
  const a = imageAsset(image);
  if (!a) return <div className={'art-placeholder ' + className} role="img" aria-label={alt} />;
  return (
    <img
      src={animated && !reduce ? a.src : a.poster}
      alt={alt}
      width={a.width}
      height={a.height}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
    />
  );
}
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
export function Button({
  children,
  to,
  external = false,
  light = false,
  className = '',
}: {
  children: ReactNode;
  to: string;
  external?: boolean;
  light?: boolean;
  className?: string;
}) {
  const cls = `button ${light ? 'button-light' : ''} ${className}`;
  return external ? (
    <a href={to} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={17} />
    </a>
  ) : (
    <Link to={to} className={cls}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="small-cross">✳</span>
      {children}
    </div>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
    setCollections(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Sons of Art — Home">
          <Art image="cropped-logo-sons-con-spazio-2.png" alt="" eager />
          <span>
            SONS OF ART<span className="brand-period">®</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/roadmap/">Roadmap</NavLink>
          <div className="nav-projects">
            <NavLink to="/nfts-2-0/">Projects</NavLink>
            <button
              aria-label="Show project collections"
              aria-expanded={collections}
              onClick={() => setCollections(!collections)}
            >
              <ChevronDown size={12} />
            </button>
            {collections && (
              <div className="project-dropdown">
                {projects.map((p) => (
                  <Link key={p.slug} to={'/' + p.slug + '/'}>
                    {p.name}
                    <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/support-faq/">Support & FAQ</NavLink>
        </nav>
        <Link className="header-contact" to="/contact/">
          Let’s talk <ArrowUpRight size={16} />
        </Link>
        <button
          ref={menuRef}
          className="mobile-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {[
              ['/', 'Home'],
              ['/roadmap/', 'Roadmap'],
              ['/nfts-2-0/', 'Projects'],
              ['/support-faq/', 'Support & FAQ'],
              ['/contact/', 'Contact'],
            ].map(([url, name]) => (
              <NavLink to={url} key={url}>
                {name}
                <ArrowUpRight size={20} />
              </NavLink>
            ))}
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 0.05}>
      <Link to={'/' + project.slug + '/'} className="project-card group">
        <div className="project-image" style={{ background: project.color }}>
          <Art image={project.image} alt={project.name + ' original artwork'} />
          <span className="card-open">
            <ArrowUpRight size={22} />
          </span>
          <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="card-info">
          <h3>{project.name}</h3>
          <span>{project.category}</span>
        </div>
        <p>{project.label}</p>
      </Link>
    </Reveal>
  );
}
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div className="accordion-item" key={item.q}>
          <h3>
            <button
              id={'faq-button-' + i}
              aria-expanded={active === i}
              aria-controls={'faq-answer-' + i}
              onClick={() => setActive(active === i ? null : i)}
            >
              <span className="faq-number">{String(i + 1).padStart(2, '0')}</span>
              {item.q}
              {active === i ? <Minus size={19} /> : <Plus size={19} />}
            </button>
          </h3>
          <div
            id={'faq-answer-' + i}
            role="region"
            aria-labelledby={'faq-button-' + i}
            hidden={active !== i}
          >
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function Footer({ onPrivacy }: { onPrivacy: () => void }) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Eyebrow>LET’S MAKE SOMETHING MEANINGFUL</Eyebrow>
            <Link to="/contact/" className="footer-title">
              Creativity has
              <br />
              no finish line.
              <ArrowUpRight />
            </Link>
          </div>
          <div className="footer-links">
            <a href={'mailto:' + EMAIL}>
              {EMAIL}
              <ArrowUpRight size={16} />
            </a>
            <a href="https://x.com/OfSons11227" target="_blank" rel="noopener noreferrer">
              Follow on X<ArrowUpRight size={16} />
            </a>
            <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer">
              Common Ground
              <ArrowUpRight size={16} />
            </a>
            <a href={GAME_URL} target="_blank" rel="noopener noreferrer">
              Play Lukso Family Game
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          SONS OF ART<span>✳</span>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sons of Art. Independent by nature.</p>
          <div>
            <Link to="/privacy/">Privacy</Link>
            <Link to="/cookies/">Cookies</Link>
            <button onClick={onPrivacy}>Privacy settings</button>
            <Link to="/terms/">Terms & credits</Link>
          </div>
          <span>ART. TECHNOLOGY. PEOPLE.</span>
        </div>
      </div>
    </footer>
  );
}
export function PrivacyPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open && !ref.current?.open) ref.current?.showModal();
    else if (!open && ref.current?.open) ref.current.close();
  }, [open]);
  function save() {
    try {
      localStorage.setItem(
        'soa-privacy-notice',
        JSON.stringify({ version: 1, acknowledgedAt: Date.now() }),
      );
    } catch {}
    onClose();
  }
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClose={onClose}
      className="privacy-dialog"
      aria-labelledby="privacy-title"
    >
      <button className="dialog-close" onClick={onClose} aria-label="Close privacy settings">
        <X />
      </button>
      <ShieldCheck className="text-accent" size={30} />
      <Eyebrow>YOUR PRIVACY, RESPECTED</Eyebrow>
      <h2 id="privacy-title">
        Creative freedom.
        <br />
        No tracking.
      </h2>
      <p>
        We don’t use analytics, advertising cookies or tracking pixels. Fonts and images are served
        directly from this website.
      </p>
      <div className="privacy-row">
        <div>
          <strong>Essential functionality</strong>
          <small>Your privacy notice preference is stored only if you choose to save it.</small>
        </div>
        <span>Only on request</span>
      </div>
      <div className="privacy-row">
        <div>
          <strong>Analytics & advertising</strong>
          <small>No tracking services are installed.</small>
        </div>
        <span>Not used</span>
      </div>
      <p className="small-copy">
        Links to the game, social networks and other websites open external services with their own
        policies.{' '}
        <Link to="/cookies/" onClick={onClose}>
          Read our Cookie Policy.
        </Link>
      </p>
      <button className="button w-full justify-center" onClick={save}>
        Got it — save my preference
        <ArrowRight size={17} />
      </button>
      <button className="text-button mx-auto mt-4 block" onClick={onClose}>
        Continue without saving
      </button>
    </dialog>
  );
}
