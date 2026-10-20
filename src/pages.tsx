import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Play,
  Download,
  Search,
  Mail,
  ChevronLeft,
  ChevronRight,
  Check,
  Music2,
  Box,
  Gamepad2,
} from 'lucide-react';
import { Art, Button, Eyebrow, Reveal, ProjectCard, Accordion } from './components';
import {
  projects,
  principles,
  faqs,
  GAME_URL,
  EMAIL,
  COMMUNITY_URL,
  type Project,
} from './data/content';
import galleryData from './data/galleries.json';
const galleries = galleryData as Record<string, string[]>;

export function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-overline">
          <Eyebrow>INDEPENDENT MINDS. SHARED IMAGINATION.</Eyebrow>
          <span className="online-tag">
            <i />
            CREATING ON LUKSO
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              Art,
              <br />
              <span className="serif-word">evolved.</span>
              <span className="hero-asterisk" aria-hidden="true">
                ✳
              </span>
            </h1>
            <p>
              We’re Sons of Art. A collective turning art, music and games into experiences worth
              being part of.
            </p>
            <div className="hero-actions">
              <Button to="/nfts-2-0/">Explore our world</Button>
              <a className="text-link" href="#our-mission">
                Meet the collective <ArrowDown size={15} />
              </a>
            </div>
            <div className="hero-footnote">
              <span>CREATIVITY WITHOUT BOUNDARIES</span>
              <span>EST. IN IMAGINATION ↗</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-topline">
              <span>FROM THE SONS OF ART UNIVERSE</span>
              <span>01 — 07</span>
            </div>
            <Link
              to="/dj-pigs-collection/"
              className="hero-art-link"
              aria-label="Explore the DJ Pigs collection"
            >
              <Art
                image="1.gif"
                alt="A colourful DJ Pig character from the original Sons of Art collection"
                eager
                className="hero-art-main"
              />
              <m.div
                className="hero-art-sticker"
                initial={false}
                whileHover={{ rotate: 8, scale: 1.04 }}
              >
                <span>
                  MADE OF
                  <br />
                  IMAGINATION
                </span>
                <span className="sticker-star">✳</span>
              </m.div>
              <span className="hero-art-arrow">
                <ArrowUpRight size={26} />
              </span>
            </Link>
            <div className="art-caption">
              <div>
                <strong>DJ Pigs</strong>
                <span>A little different. A lot of character.</span>
              </div>
              <span>DIGITAL ART / LUKSO</span>
            </div>
          </div>
        </div>
      </section>
      <div className="discipline-strip" aria-label="Our creative disciplines">
        <div>
          <span>DIGITAL ART</span>
          <i>✳</i>
          <span>MUSIC</span>
          <i>✳</i>
          <span>GAMES</span>
          <i>✳</i>
          <span>PHOTOGRAPHY</span>
          <i>✳</i>
          <span>NFT 2.0</span>
          <i>✳</i>
          <span>CREATIVE TECHNOLOGY</span>
          <i>✳</i>
        </div>
      </div>
      <section className="game-feature section shell">
        <div className="section-top">
          <Eyebrow>01 / PLAY TOGETHER</Eyebrow>
          <span className="status-pill">
            <i />
            NOW PLAYABLE
          </span>
        </div>
        <div className="game-grid">
          <Reveal className="game-visual">
            <Art
              image="Gioco-screen.png"
              alt="Lukso Family Game interface with illustrated community character cards"
            />
            <span className="image-label">
              <Gamepad2 size={15} /> THE FAMILY IS WAITING.
            </span>
          </Reveal>
          <Reveal className="feature-copy">
            <h2>
              Good company.
              <br />
              <span className="muted">Great game.</span>
            </h2>
            <p>
              Meet the LUKSO family, one card at a time. Unique characters, unexpected powers and
              the kind of moments that bring everyone together.
            </p>
            <p>Our community card game is ready to play. Your next adventure starts here.</p>
            <div className="flex flex-wrap items-center gap-5">
              <Button to={GAME_URL} external>
                Play the game
                <Play size={14} />
              </Button>
              <Link className="text-link" to="/nft-iconic-lukso-family-game/">
                Discover the project
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="collect-section">
        <div className="shell collect-inner">
          <div>
            <Eyebrow>02 / COLLECT A DIFFERENT PERSPECTIVE</Eyebrow>
            <h2>
              More than an image.
              <br />
              <span className="serif-word">A world of its own.</span>
            </h2>
          </div>
          <div>
            <p>
              From music you can collect to characters you can play, our NFT 2.0 projects explore
              new connections between creativity and digital ownership on LUKSO.
            </p>
            <Button to="/nfts-2-0/" light>
              Discover the collections
            </Button>
          </div>
        </div>
        <div className="shell collect-steps">
          {[
            ['01', 'Explore', 'Find the project that speaks to you.'],
            ['02', 'Discover', 'Get to know its art, story and creative process.'],
            ['03', 'Connect', 'Meet a community built around shared curiosity.'],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="our-mission" className="section shell mission">
        <div className="section-top">
          <Eyebrow>03 / WHY WE CREATE</Eyebrow>
          <span className="micro-label">ART + TECHNOLOGY + PEOPLE</span>
        </div>
        {principles.map((p, i) => (
          <Reveal className={'principle-row ' + (i % 2 ? 'reverse' : '')} key={p.title}>
            <div className="principle-image">
              <Art
                image={p.image}
                alt={p.title + ' — original Sons of Art creative illustration'}
              />
              <span>{p.tag}</span>
            </div>
            <div className="principle-copy">
              <span className="principle-number">0{i + 1}</span>
              <h2>{p.title}</h2>
              <p>{p.text}</p>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="section projects-home shell">
        <div className="section-top">
          <Eyebrow>04 / SELECTED PROJECTS</Eyebrow>
          <Link className="text-link" to="/nfts-2-0/">
            View all projects
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="section-heading">
          <h2>
            Different mediums.
            <br />
            <span className="muted">Same restless spirit.</span>
          </h2>
          <p>
            Ideas take many forms.
            <br />
            These are some of ours.
          </p>
        </div>
        <div className="project-grid">
          {projects.slice(0, 3).map((p, i) => (
            <ProjectCard project={p} index={i} key={p.slug} />
          ))}
        </div>
      </section>
      <section className="music-feature shell">
        <Reveal className="music-art">
          <Art
            image="Spuma-Deep-Jackin-Lukso-Fam-UNREVEALED.png"
            alt="SPUMA Deep Jackin Lukso Fam musical collectible artwork"
          />
          <span className="music-icon">
            <Music2 size={32} />
          </span>
        </Reveal>
        <div className="music-copy">
          <Eyebrow>SOUND, WITH A NEW DIMENSION</Eyebrow>
          <h2>
            Feel the beat.
            <br />
            <span className="serif-word">Own the moment.</span>
          </h2>
          <p>
            Deep Jackin Lukso Fam brings our creative universe into sound. A musical collaboration
            with Italian DJ and producer SPUMA, with four editions and 3D assets.
          </p>
          <Button to="/deep-jackin-lukso-fam/" light>
            Explore the collaboration
          </Button>
        </div>
      </section>
      <section className="collective-photo shell">
        <Art
          image="alex-kotliarskyi"
          alt="Creators working together at laptops in a collaborative studio"
        />
        <div>
          <Eyebrow>IMAGINATION IS A COLLECTIVE EFFORT</Eyebrow>
          <h2>
            Ideas come to life
            <br />
            when people connect.
          </h2>
        </div>
      </section>
      <section className="section shell creators">
        <div className="section-top">
          <Eyebrow>05 / THE PEOPLE BEHIND THE IDEAS</Eyebrow>
          <span className="micro-label">INDEPENDENT. CONNECTED. CURIOUS.</span>
        </div>
        <div className="creators-grid">
          <div>
            <h2>
              A small collective.
              <br />
              <span className="muted">An open imagination.</span>
            </h2>
            <p>
              Creators working across games, graphics, photography, music and digital collectibles.
              Different perspectives. One shared drive to make something meaningful.
            </p>
            <Link className="text-link" to="/contact/">
              Start a conversation
              <ArrowUpRight size={17} />
            </Link>
          </div>
          {[
            { name: 'Danilo', image: 'd-e1701477280932.jpg', url: 'https://x.com/Danilo12370607' },
            { name: 'lucio8386', image: 'l.jpeg', url: 'https://x.com/lucio8386' },
          ].map((person) => (
            <a
              className="creator-card"
              key={person.name}
              href={person.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Art image={person.image} alt={person.name + ' — Sons of Art creator'} />
              <div>
                <h3>{person.name}</h3>
                <ArrowUpRight size={20} />
              </div>
              <span>CREATOR / SONS OF ART</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading shell">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
export function Projects() {
  const [filter, setFilter] = useState('All projects');
  const [query, setQuery] = useState('');
  const filtered = projects.filter(
    (p) =>
      (filter === 'All projects' || p.category === filter) &&
      (p.name + ' ' + p.description).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="THE SONS OF ART UNIVERSE"
        title="Curiosity, made real."
        description="Games, music, digital art and stories. Explore the ideas that make us who we are."
      />
      <section className="shell projects-page">
        <div className="project-toolbar">
          <div className="filters" aria-label="Filter projects">
            {['All projects', 'Digital art', 'Games', 'Music', '3D & stories'].map((f) => (
              <button
                aria-pressed={filter === f}
                className={filter === f ? 'active' : ''}
                onClick={() => setFilter(f)}
                key={f}
              >
                {f}
                {f === 'All projects' && <span>07</span>}
              </button>
            ))}
          </div>
          <label className="project-search">
            <Search size={17} />
            <span className="sr-only">Search projects</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your inspiration"
              type="search"
            />
          </label>
        </div>
        <p className="sr-only" role="status">
          {filtered.length} projects found
        </p>
        <div className="project-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-state">
            <h2>No projects found.</h2>
            <p>Try a different search or explore all our projects.</p>
            <button
              className="button"
              onClick={() => {
                setFilter('All projects');
                setQuery('');
              }}
            >
              Show all projects
              <ArrowRight size={16} />
            </button>
          </div>
        )}
        <div className="archive-note">
          <span>✳</span>
          <p>
            Made possible by a community
            <br />
            that keeps believing in creativity.
          </p>
          <Link to="/contact/" className="text-link">
            Be part of the conversation
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

export function ProjectDetail({ project: p }: { project: Project }) {
  const index = projects.indexOf(p);
  const isGame = index === 0;
  const imgs = galleries['/' + p.slug + '/'] || [];
  const detailImages = imgs.filter(
    (k) => k !== p.image && !k.includes('maxresdefault') && !k.includes('mqdefault'),
  );
  return (
    <>
      <section className="project-intro shell">
        <Link className="back-link" to="/nfts-2-0/">
          <ChevronLeft size={15} />
          All projects
        </Link>
        <div className="project-title-row">
          <div>
            <Eyebrow>{p.category.toUpperCase()} / SONS OF ART</Eyebrow>
            <h1>{p.name}</h1>
          </div>
          <span className="project-counter">
            {String(index + 1).padStart(2, '0')}
            <span> / 07</span>
          </span>
        </div>
        <div className="project-lead-grid">
          <div className="detail-cover" style={{ background: p.color }}>
            <Art image={p.image} alt={p.name + ' — collection artwork'} eager animated />
            <span className="cover-caption">{p.label}</span>
          </div>
          <div className="detail-copy">
            <h2>{p.label}</h2>
            <p className="project-description">{p.description}</p>
            <p>{p.body}</p>
            <ul className="project-facts">
              {p.details.map((d) => (
                <li key={d}>
                  <Check size={15} />
                  {d}
                </li>
              ))}
            </ul>
            {isGame ? (
              <Button to={GAME_URL} external>
                Play the game
                <Play size={15} />
              </Button>
            ) : (
              <Button to="/contact/">Ask about this collection</Button>
            )}
            <div className="detail-meta">
              <span>CREATED BY SONS OF ART</span>
              <span>LUKSO / NFT 2.0</span>
            </div>
          </div>
        </div>
      </section>
      {isGame && (
        <section className="shell section game-resources">
          <div className="section-heading">
            <div>
              <Eyebrow>EVERYTHING YOU NEED TO GET STARTED</Eyebrow>
              <h2>Your next move.</h2>
            </div>
            <p>
              Learn the rules. Meet the characters.
              <br />
              Bring the family together.
            </p>
          </div>
          <Art
            image="Gioco-screen-1-1024x485.jpg"
            alt="Lukso Family Game digital playing table"
            className="game-screen"
          />
          <div className="download-grid">
            <a href="/documents/instruction-manual.pdf" download>
              <Download />
              <div>
                <h3>Instruction manual</h3>
                <span>THE GAME RULES / PDF</span>
              </div>
              <ArrowUpRight />
            </a>
            <a href="/documents/printable-deck.pdf" download>
              <Download />
              <div>
                <h3>Printable deck</h3>
                <span>BRING IT TO THE TABLE / PDF</span>
              </div>
              <ArrowUpRight />
            </a>
            <Link to="/game-simulation/">
              <Gamepad2 />
              <div>
                <h3>Example moves</h3>
                <span>SEE THE GAME IN ACTION</span>
              </div>
              <ArrowUpRight />
            </Link>
          </div>
        </section>
      )}
      {p.slug === 'winged-legends' ? (
        <>
          <section className="shell winged-intro-art">
            <Art image="ali-logo2.jpeg" alt="Winged Legends original collection emblem" />
            <Art
              image="sfondo-bird-trasparente-1024x737.png"
              alt="Original Winged Legends character ensemble"
            />
          </section>
          <WingedGallery images={detailImages.filter((k) => /^\d+\.jpg$/.test(k))} />
        </>
      ) : p.slug === 'deep-jackin-lukso-fam' ? (
        <section className="section shell">
          <div className="section-heading">
            <div>
              <Eyebrow>FOUR EDITIONS. ONE SHARED FREQUENCY.</Eyebrow>
              <h2>Find your sound.</h2>
            </div>
            <span className="micro-label">MUSIC + DIGITAL ART + 3D</span>
          </div>
          <div className="edition-grid">
            {[
              ['pink.gif', 'Pink', 'UN7t1QDmCXo'],
              ['gold.gif', 'Gold', 'FI8yZyKCAXU'],
              ['silver.gif', 'Silver', 'KzDK161zEs0'],
              ['black.gif', 'Black', 'a4gNOhdDLVg'],
            ].map(([image, name, id]) => (
              <a
                key={id}
                href={'https://www.youtube.com/watch?v=' + id}
                target="_blank"
                rel="noopener noreferrer"
                className="edition-card"
              >
                <Art image={image} alt={name + ' edition 3D music collectible'} animated />
                <div>
                  <h3>{name} edition</h3>
                  <Play size={18} />
                </div>
                <span>LISTEN ON YOUTUBE ↗</span>
              </a>
            ))}
          </div>
          <a
            className="text-link mt-10 inline-flex"
            href="https://www.youtube.com/watch?v=h03VjwiZzus"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meet SPUMA, producer & DJ
            <ArrowUpRight size={16} />
          </a>
        </section>
      ) : (
        <section className="section shell artwork-gallery">
          <div className="section-heading">
            <div>
              <Eyebrow>A CLOSER LOOK</Eyebrow>
              <h2>{isGame ? 'From screen to table.' : 'Inside the project.'}</h2>
            </div>
            <span className="micro-label">ORIGINAL ARTWORK & CREATIVE EXPLORATIONS</span>
          </div>
          <div className={'detail-gallery ' + (isGame ? 'game-gallery' : '')}>
            {detailImages.map((image, i) => (
              <Reveal key={image}>
                <Art
                  image={image}
                  alt={
                    p.name +
                    ' — ' +
                    (isGame && i < 4
                      ? [
                          'game introduction',
                          'actions, powers and cards',
                          'character card guide',
                          'collection overview',
                        ][i]
                      : 'original artwork ' + (i + 1))
                  }
                  animated
                />
                <span>
                  {String(i + 1).padStart(2, '0')} / {p.name}
                </span>
              </Reveal>
            ))}
          </div>
        </section>
      )}
      <section className="next-project shell">
        <span className="micro-label">KEEP EXPLORING / NEXT PROJECT</span>
        <Link to={'/' + projects[(index + 1) % projects.length].slug + '/'}>
          {projects[(index + 1) % projects.length].name}
          <ArrowUpRight />
        </Link>
      </section>
    </>
  );
}

function WingedGallery({ images }: { images: string[] }) {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState<string | null>(null);
  const filtered = images.filter((k) => k.includes(query));
  const count = Math.ceil(filtered.length / 24);
  function change(n: number) {
    setPage(n);
    document
      .getElementById('legends-gallery')
      ?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  return (
    <section className="section shell legends-gallery" id="legends-gallery">
      <div className="section-heading">
        <div>
          <Eyebrow>THE COMPLETE COLLECTION</Eyebrow>
          <h2>
            A thousand ways
            <br />
            to be legendary.
          </h2>
        </div>
        <label className="project-search">
          <Search size={17} />
          <span className="sr-only">Find artwork by file number</span>
          <input
            placeholder="Search artwork number"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
          />
        </label>
      </div>
      <div className="gallery-summary" role="status">
        <span>{filtered.length.toLocaleString('en-US')} ORIGINAL ARTWORKS</span>
        <span>
          PAGE {count ? page + 1 : 0} OF {count}
        </span>
      </div>
      <div className="legends-grid">
        {filtered.slice(page * 24, page * 24 + 24).map((image, i) => (
          <button key={image} onClick={() => setSelection(image)} className="legend-card">
            <Art image={image} alt={'Winged Legends artwork ' + image.replace('.jpg', '')} />
            <span>
              LEGEND / {String(page * 24 + i + 1).padStart(4, '0')}
              <ArrowUpRight size={15} />
            </span>
          </button>
        ))}
      </div>
      {!filtered.length && <p className="empty-state">No artwork matches this number.</p>}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => change(page - 1)}>
          <ChevronLeft size={17} />
          Previous
        </button>
        <span>
          {count ? page + 1 : 0} / {count}
        </span>
        <button disabled={page + 1 >= count} onClick={() => change(page + 1)}>
          Next
          <ChevronRight size={17} />
        </button>
      </div>
      {selection && <ArtworkDialog image={selection} onClose={() => setSelection(null)} />}
    </section>
  );
}

function ArtworkDialog({ image, onClose }: { image: string; onClose: () => void }) {
  return (
    <div className="lightbox" role="presentation" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Winged Legends artwork preview"
        className="lightbox-inner"
        ref={(el) => {
          if (el) {
            const close = el.querySelector('button');
            close?.focus();
          }
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
          if (e.key === 'Tab') {
            e.preventDefault();
          }
        }}
      >
        <button onClick={onClose} aria-label="Close artwork preview">
          Close ×
        </button>
        <Art image={image} alt={'Winged Legends artwork ' + image.replace('.jpg', '')} />
        <span>WINGED LEGENDS / ARTWORK {image.replace('.jpg', '')}</span>
      </div>
    </div>
  );
}

export function Roadmap() {
  return (
    <>
      <PageHeading
        eyebrow="THE JOURNEY CONTINUES"
        title="Ideas in motion."
        description="Our creative roadmap connects art, music, technology and the people who make it all possible."
      />
      <section className="shell roadmap-page">
        <div className="roadmap-image">
          <Art
            image="road-map.png"
            alt="Original Sons of Art roadmap outlining the collective’s creative projects and development plans"
            eager
          />
        </div>
        <div className="roadmap-caption">
          <span className="micro-label">THE ORIGINAL SONS OF ART ROADMAP</span>
          <a href={galleries['/roadmap/']?.[0] ? '/roadmap/' : undefined} className="sr-only">
            Roadmap
          </a>
          <span className="micro-label">EXPLORE THE PROJECTS BELOW</span>
        </div>
        <div className="roadmap-journey">
          {[
            [
              '01',
              'Play & connect',
              'A card game inspired by the LUKSO community. Play the digital game, read the rules and discover its physical version.',
              projects[0],
            ],
            [
              '02',
              'Explore new frequencies',
              'A collaboration with SPUMA brings music, visual editions and 3D assets together.',
              projects[1],
            ],
            [
              '03',
              'Build creative worlds',
              'Distinctive characters, reimagined icons and new digital stories form our collection archive.',
              projects[4],
            ],
          ].map(([n, title, description, project]) => {
            const p = project as Project;
            return (
              <div className="roadmap-step" key={n as string}>
                <span>{n as string}</span>
                <div>
                  <h2>{title as string}</h2>
                  <p>{description as string}</p>
                  <Link to={'/' + p.slug + '/'} className="text-link">
                    {p.name}
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
                <Art image={p.image} alt={p.name + ' artwork'} />
              </div>
            );
          })}
        </div>
        <div className="roadmap-outro">
          <Eyebrow>THE NEXT CHAPTER IS STILL BEING WRITTEN</Eyebrow>
          <h2>
            Stay curious.
            <br />
            <span className="serif-word">Stay connected.</span>
          </h2>
          <p>Explore the archive or get in touch to talk about what comes next.</p>
          <Button to="/contact/">Join the conversation</Button>
        </div>
      </section>
    </>
  );
}

export function Contact() {
  const [prepared, setPrepared] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = String(data.get('subject') || 'Hello Sons of Art');
    const body = `Name: ${data.get('name')}\nReply to: ${data.get('email')}\n\n${data.get('message')}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return (
    <>
      <PageHeading
        eyebrow="GOOD IDEAS START WITH A CONVERSATION"
        title="Let’s create a connection."
        description="A project in mind? A question about our work? Or just a shared curiosity? We’d love to hear from you."
      />
      <section className="shell section contact-grid">
        <div className="contact-info">
          <Eyebrow>SAY HELLO</Eyebrow>
          <a className="contact-email" href={'mailto:' + EMAIL}>
            {EMAIL}
            <ArrowUpRight size={22} />
          </a>
          <p>
            We’re an independent creative project.
            <br />
            Reach out directly or find us in the community.
          </p>
          <div className="contact-channel">
            <span>01 / COMMUNITY</span>
            <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer">
              Find us on Common Ground
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="contact-channel">
            <span>02 / THE COLLECTIVE</span>
            <a href="https://x.com/OfSons11227" target="_blank" rel="noopener noreferrer">
              Sons of Art on X<ArrowUpRight size={17} />
            </a>
            <a href="https://x.com/Danilo12370607" target="_blank" rel="noopener noreferrer">
              Danilo
              <ArrowUpRight size={17} />
            </a>
            <a href="https://x.com/lucio8386" target="_blank" rel="noopener noreferrer">
              lucio8386
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <form
          onSubmit={submit}
          action={'mailto:' + EMAIL}
          method="post"
          encType="text/plain"
          className="contact-form"
        >
          <h2>What’s on your mind?</h2>
          <div className="form-row">
            <label>
              Your name <span>*</span>
              <input
                name="name"
                required
                autoComplete="name"
                maxLength={100}
                placeholder="Your name"
              />
            </label>
            <label>
              Email address <span>*</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                maxLength={200}
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label>
            Subject
            <input
              name="subject"
              maxLength={180}
              placeholder="A collaboration, a question, an idea…"
            />
          </label>
          <label>
            Your message <span>*</span>
            <textarea
              name="message"
              required
              rows={5}
              maxLength={4000}
              placeholder="Tell us a little about it."
            />
          </label>
          <p className="form-notice">
            This form prepares an email in your own email app. Nothing is sent or saved by this
            website. Review our <Link to="/privacy/">Privacy Policy</Link> before sending.
          </p>
          <button type="submit" className="button">
            Prepare email
            <ArrowUpRight size={17} />
          </button>
          {prepared && (
            <p role="status" className="form-feedback">
              <Check size={17} />
              Your email app has been requested. Review and send your message there. If it didn’t
              open, email {EMAIL} directly.
            </p>
          )}
        </form>
      </section>
    </>
  );
}

export function Support() {
  return (
    <>
      <PageHeading
        eyebrow="A LITTLE CLARITY GOES A LONG WAY"
        title="Curious? You’re in good company."
        description="A few answers about our projects, digital collectibles and the creative world we’re building."
      />
      <section className="section shell faq-layout">
        <div>
          <Eyebrow>SUPPORT & FAQ</Eyebrow>
          <h2>
            Good questions.
            <br />
            <span className="muted">Clear answers.</span>
          </h2>
          <p>
            Can’t find what you’re looking for?
            <br />
            We’re always happy to help.
          </p>
          <Link to="/contact/" className="text-link">
            Ask us a question
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <Accordion items={faqs} />
      </section>
      <section className="support-game shell">
        <Gamepad2 size={34} />
        <div>
          <h2>Here for the game?</h2>
          <p>Find the rules and example moves, then get the family together.</p>
        </div>
        <Button to="/nft-iconic-lukso-family-game/">Game guide & downloads</Button>
      </section>
    </>
  );
}
export function GameExamples() {
  return (
    <>
      <PageHeading
        eyebrow="LUKSO FAMILY GAME / THE PLAYBOOK"
        title="Make your next move."
        description="See how a game unfolds with these original illustrated example moves."
      />
      <section className="shell section">
        <div className="download-actions">
          <a href="/documents/game-examples.pdf" download className="button">
            Download examples PDF
            <Download size={17} />
          </a>
          <Button to={GAME_URL} external>
            Play the game
          </Button>
          <Link to="/nft-iconic-lukso-family-game/" className="text-link">
            Back to the project
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="examples-grid">
          {(galleries['/game-simulation/'] || []).map((image, i) => (
            <div key={image}>
              <Eyebrow>EXAMPLE MOVE {i + 1}</Eyebrow>
              <Art image={image} alt={'Illustrated Lukso Family Game example move ' + (i + 1)} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Legal({ kind }: { kind: 'privacy' | 'cookies' | 'terms' }) {
  const isPrivacy = kind === 'privacy';
  const isCookies = kind === 'cookies';
  return (
    <>
      <PageHeading
        eyebrow="TRANSPARENCY, BY DESIGN"
        title={
          isPrivacy
            ? 'Your privacy matters.'
            : isCookies
              ? 'Cookies, clearly explained.'
              : 'A few things to know.'
        }
        description={
          isPrivacy
            ? 'How this website handles information and how to contact us about your privacy.'
            : isCookies
              ? 'A straightforward look at cookies, browser storage and external services.'
              : 'About this independent project, the artworks we share and the links you follow.'
        }
      />
      <article className="shell legal-content">
        <div className="legal-updated">LAST UPDATED / 20 OCTOBER 2026</div>
        {isPrivacy ? (
          <>
            <h2>1. About this website</h2>
            <p>
              Sons of Art is an independent, non-commercial hobby project operated by a private
              individual under the public project name Sons of Art. Privacy enquiries can be sent to{' '}
              <a href={'mailto:' + EMAIL}>{EMAIL}</a>.
            </p>
            <h2>2. Information handled when you browse</h2>
            <p>
              The website application does not create visitor accounts, connect wallets, process
              payments, run analytics or use advertising trackers. Fonts and images are served
              locally. The hosting infrastructure necessarily receives technical request data, which
              may include IP address, requested URL, browser information and timestamps, to deliver
              pages and protect the service.
            </p>
            <p>
              Technical processing required to deliver and secure the website is based on legitimate
              interests in operating a secure website, subject to applicable law. Hosting providers
              process technical data under their own service terms and, where applicable, data
              processing agreements.
            </p>
            <h2>3. Contacting us</h2>
            <p>
              The contact form prepares an email in your own email application. Its fields are held
              in the current page only; the website does not submit them to a server or save a copy.
              If you choose to send that email, the recipient receives your email address, message
              and any information you include. Please avoid sending sensitive personal data.
            </p>
            <p>
              Correspondence is used to respond to your request. Depending on the request, the
              applicable basis is taking steps at your request before a potential agreement, or our
              legitimate interest in responding to enquiries. Messages should be retained only while
              needed to handle the enquiry and related follow-up, or for any applicable legal
              obligation. There are no automated decisions or profiling.
            </p>
            <h2>4. Service providers and international processing</h2>
            <p>
              The production hosting provider and the email provider may process technical data or
              correspondence. Provider locations, retention periods and applicable international
              transfer safeguards depend on the services configured by the operator. These details
              must be confirmed for the production deployment.
            </p>
            <h2>5. External websites</h2>
            <p>
              The game, X, Common Ground and YouTube are separate services. Following their links
              takes you outside this website and may allow those services to process your
              information under their own policies. No third-party video player is loaded on this
              website.
            </p>
            <h2>6. Your rights</h2>
            <p>
              Where the GDPR applies, you may request access, correction, deletion, restriction or
              portability of your personal data, and object to processing based on legitimate
              interests. These rights are subject to the conditions set by law. Contact{' '}
              <a href={'mailto:' + EMAIL}>{EMAIL}</a> to make a request. You may also lodge a
              complaint with a competent data protection authority, including the{' '}
              <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer">
                Italian Garante per la protezione dei dati personali
              </a>
              .
            </p>
            <h2>7. Cookies and changes</h2>
            <p>
              For details about browser storage, see the <Link to="/cookies/">Cookie Policy</Link>.
              This notice may be updated when the website or its services change.
            </p>
          </>
        ) : isCookies ? (
          <>
            <h2>1. No advertising or analytics cookies</h2>
            <p>
              This website does not install analytics cookies, advertising cookies, tracking pixels,
              fingerprinting tools or third-party embedded players. We do not sell visitor data or
              build advertising profiles. Website assets, including fonts and artwork, are hosted
              locally.
            </p>
            <h2>2. Browser storage inventory</h2>
            <div className="legal-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                    <th>Provider</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>soa-privacy-notice</code>
                    </td>
                    <td>
                      Local storage recording that you chose to save the privacy notice preference.
                      It contains a version number and timestamp, with no visitor identifier.
                    </td>
                    <td>
                      Up to 6 months; ignored and removed on your next visit after expiry. You can
                      clear it sooner.
                    </td>
                    <td>This website</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              This optional preference is stored only when you select “Got it — save my preference”
              in Privacy settings. Closing the panel or continuing without saving writes nothing. It
              is not used to measure visits or track you.
            </p>
            <h2>3. Your choices</h2>
            <p>
              You can use all pages without saving this preference. Open “Privacy settings” in the
              footer to review the information at any time. You can remove local storage using your
              browser’s site data controls. No non-essential tracking is enabled, so there are no
              analytics or advertising categories to accept.
            </p>
            <h2>4. External services</h2>
            <p>
              Following a link to the game, social networks, community platforms or YouTube opens a
              separate website. These services may use their own cookies and storage under their own
              policies. Their cookies are not controlled by this website.
            </p>
            <h2>5. Questions</h2>
            <p>
              Contact <a href={'mailto:' + EMAIL}>{EMAIL}</a> for questions. Read the{' '}
              <Link to="/privacy/">Privacy Policy</Link> for additional information about technical
              request data and correspondence.
            </p>
          </>
        ) : (
          <>
            <h2>1. An independent creative project</h2>
            <p>
              Sons of Art is a hobby project operated by a private individual, rather than a
              registered company. This website presents a creative portfolio and project archive. It
              does not offer checkout, wallet connections, minting or payment processing.
            </p>
            <h2>2. Artwork and intellectual property</h2>
            <p>
              Artworks and project materials are presented as part of the Sons of Art portfolio.
              Intellectual property rights remain with their respective rights holders. Displaying
              an artwork here does not grant a licence to reproduce, redistribute or commercially
              exploit it. Contact us for permission enquiries.
            </p>
            <p>
              References to LUKSO, artists, characters, brands and design icons are used to describe
              the original projects. Associated names, logos and character rights belong to their
              respective owners. A reference does not imply sponsorship, endorsement or affiliation.
            </p>
            <h2>3. Digital collectibles</h2>
            <p>
              Project descriptions may refer to past releases and historical collection features.
              They do not guarantee present availability, functionality, value or future
              development. Acquiring a token does not automatically transfer copyright. Any
              collection or transaction is subject to its own applicable terms.
            </p>
            <h2>4. External services and game</h2>
            <p>
              Lukso Family Game is hosted separately. External websites, games, social platforms and
              media services operate under their own terms and privacy policies. Please review those
              policies before using their services.
            </p>
            <h2>5. Contact</h2>
            <p>
              For project questions, rights enquiries or concerns about material displayed on the
              website, email <a href={'mailto:' + EMAIL}>{EMAIL}</a>.
            </p>
          </>
        )}
        <div className="legal-related">
          <Link to="/privacy/">
            Privacy Policy
            <ArrowUpRight size={15} />
          </Link>
          <Link to="/cookies/">
            Cookie Policy
            <ArrowUpRight size={15} />
          </Link>
          <Link to="/terms/">
            Terms & credits
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </article>
    </>
  );
}
export function NotFound() {
  return (
    <section className="shell not-found">
      <Eyebrow>404 / A LITTLE OFF THE CANVAS</Eyebrow>
      <h1>
        Let’s get you
        <br />
        <span className="serif-word">back to the art.</span>
      </h1>
      <p>This page doesn’t exist. There’s plenty more to discover.</p>
      <Button to="/">Back to home</Button>
    </section>
  );
}
