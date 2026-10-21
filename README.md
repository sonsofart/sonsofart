# Sons of Art

**An independent creative collective. A self-contained digital portfolio.**

A complete English-language rebuild of the Sons of Art website, presenting its games, music, digital artworks and NFT 2.0 projects through a responsive editorial interface. The application ships as prerendered static pages and is prepared for deployment on Vercel.

Original artwork, collection imagery, roadmap and game documents are hosted within this project. The separately maintained **[Lukso Family Game](https://luksofamilygame.sonsofart.it/)** remains an external service.

## At a glance

| Area         | Implementation                                                                       |
| ------------ | ------------------------------------------------------------------------------------ |
| Interface    | React 19, TypeScript and React Router                                                |
| Styling      | Tailwind CSS 4, with a custom responsive design system                               |
| Motion       | Motion for React, with reduced-motion support                                        |
| Build        | Vite; build-time React rendering with esbuild                                        |
| Delivery     | Static HTML, CSS, JavaScript and local assets                                        |
| Typography   | Locally hosted Inter and Space Grotesk                                               |
| Artwork      | Optimized WebP images; optimized animated WebP for selected animated views           |
| Search       | Per-page metadata, canonical URLs, structured data, XML sitemap and robots.txt       |
| AI discovery | Crawlable HTML and an informational llms.txt file                                    |
| Privacy      | No analytics, advertising pixels, wallet connections or embedded third-party players |
| Contact      | A local email composer that opens the visitor’s email application                    |
| Hosting      | Vercel-compatible static output; no application database or server required          |

## Requirements

- Node.js 22 LTS or a compatible supported release.
- npm, using the committed `package-lock.json` for reproducible installation.

On Windows installations that restrict PowerShell scripts, use `npm.cmd` instead of `npm`.

## Getting started

```sh
npm ci
npm run dev
```

Open the local address printed by Vite, normally `http://127.0.0.1:5173`.

```sh
npm run check
npm run build
npm run preview
```

| Command                | Purpose                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| `npm run dev`          | Start the development server with hot updates.                            |
| `npm run check`        | Run TypeScript validation and the production artifact audit. Build first. |
| `npm run build`        | Type-check, compile assets and prerender all public routes.               |
| `npm run preview`      | Serve the production output locally.                                      |
| `npm run format`       | Format application source, scripts and project documentation.             |
| `npm run format:check` | Check source formatting without changing files.                           |

The production output is written to `dist/`. It is generated and should not be committed.

## Production configuration

Set the `SITE_URL` environment variable to the final public HTTPS origin **before building**. This value determines canonical URLs, social metadata, structured data, sitemap URLs and the discovery file.

```text
SITE_URL=https://sonsofart.it
```

`SITE_URL` is read from the build process environment. The prerender script does not load a local `.env` automatically. For local production builds, set it in the shell:

```powershell
$env:SITE_URL = "https://your-domain.example"
npm.cmd run build
```

```sh
SITE_URL=https://your-domain.example npm run build
```

The default is `https://sonsofart.it`. Replace it when deploying to a different domain. Do not put paths or a trailing slash in the value. Never expose secrets through `VITE_` variables: they become public browser code.

## Deploying to Vercel

1. Create the new Git repository and push the project source, lockfile, optimized media and documents.
2. Import that repository into Vercel.
3. Select the **Vite** framework preset, with `npm run build` as the build command and `dist` as the output directory.
4. Use Node.js 22 and configure `SITE_URL` for the production domain.
5. Complete the privacy and publication review below, then deploy.
6. Connect the final domain and verify canonical URLs, the sitemap, document downloads and the custom 404 response.

The supplied `vercel.json` configures clean URLs, trailing slashes, basic security headers and immutable caching for fingerprinted build assets. Each known route has its own generated HTML file. Unknown routes use `404.html`; there is deliberately no blanket SPA rewrite returning a success response for missing pages.

The application requires no paid API, database, authentication service or application server. Actual eligibility for a hosting provider’s free plan depends on that provider’s current terms, project use and traffic limits.

Vercel preview URLs should not compete with the production domain in search. Confirm preview indexing controls in the hosting settings. Do not change production canonical URLs to a preview address unless that is intentional.

## Pages and content

The original page paths are retained:

| Path                                 | Content                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| `/`                                  | Collective introduction, game, collections, mission, featured projects, music and creators |
| `/roadmap/`                          | Original roadmap and project journey                                                       |
| `/nfts-2-0/`                         | Searchable project archive with category filters                                           |
| `/nft-iconic-lukso-family-game/`     | Game project, local documents, instructions and artwork                                    |
| `/deep-jackin-lukso-fam/`            | SPUMA collaboration and four musical editions                                              |
| `/dj-pigs-collection/`               | DJ Pigs collection                                                                         |
| `/reborn-collection/`                | Reborn artwork and concept                                                                 |
| `/winged-legends/`                   | Collection story and paginated gallery of 998 available artworks                           |
| `/the-winged-legends-hunters/`       | Story NFT and Magic Net asset imagery                                                      |
| `/vespa-universal-page-anniversary/` | Vespa anniversary project archive                                                          |
| `/iconic-rides-legends/`             | Automotive NFT collection with 12 curated original artworks                                |
| `/contact/`                          | Contact details and local email preparation                                                |
| `/support-faq/`                      | Accessible project and platform questions                                                  |
| `/game-simulation/`                  | Illustrated example moves and downloadable PDF                                             |
| `/privacy/`                          | Privacy notice draft                                                                       |
| `/cookies/`                          | Cookie and browser storage disclosure                                                      |
| `/terms/`                            | Project information, website terms and rights notices                                      |

The old marketplace links and obsolete minting calls to action have been removed. The historical Vespa project URL remains for continuity; retaining that route does not create an external marketplace dependency.

**Iconic Rides Legends** is also featured on the homepage, in project navigation and in the searchable archive. The collection page preserves the supplied description and presents 12 selected artworks spanning vintage racing cars, everyday icons, sports cars, supercars and an electric interpretation. Ferrari F40 artwork serves as the cover. The original images in `Documenti/Macchine` remain unchanged and excluded from Git; optimized WebP copies are committed under `public/media/`. Selection labels are maintained in `src/data/iconic-rides.ts`. The optional `node scripts/import-iconic-rides.mjs` utility recreates those copies when the local source folder is available; it is not required for a normal build or deployment.

## Project structure

```text
src/
  App.tsx                 Routing, page lifecycle and privacy panel state
  components.tsx          Shared navigation, artwork, cards and accessible controls
  pages.tsx               Public page implementations
  styles.css              Tailwind entry and responsive design system
  entry-server.tsx        Build-time HTML rendering
  data/
    content.ts            Editorial content, project definitions and page metadata
    galleries.json        Local artwork references, grouped by original route
    media.json            Optimized media paths, poster images and dimensions
scripts/
  prerender.mjs           Static pages, metadata, structured data and discovery files
  audit.mjs               Production artifact and independence checks
  research.mjs            Original-site acquisition utility
  prepare-content.mjs     Original image and document acquisition utility
  optimize-media.mjs      Local image optimization
  archive-originals.mjs   Move acquisition originals out of the published asset tree
public/
  media/                  Optimized, self-hosted artwork and selected animations
  documents/              Game manual, printable deck and example moves
  favicon.png             Local brand icon
vercel.json               Static hosting configuration
.env.example              Documented production origin
```

Research captures, unoptimized source artwork and local verification artifacts are excluded from Git. They are not required to install, build or deploy the finished application. The final optimized media and documents **must** remain tracked.

## Updating the website

### Editorial content

Edit `src/data/content.ts` to update project names, descriptions, categories, FAQs, contact details and search metadata. Page compositions live in `src/pages.tsx`; shared components live in `src/components.tsx`.

Avoid adding invented statistics, release promises, financial claims or collection availability. Historical projects are presented as an archive, not as active sales offers.

### Artwork and media

`src/data/media.json` maps original artwork filenames to local optimized files and static posters. `src/data/galleries.json` groups artwork filenames by page. When adding new work, add its media records and gallery entry together, with meaningful alternative text at the point of use.

The asset acquisition scripts are migration utilities, rather than part of the normal build. Running them again requires access to the original website and the ignored research files. They should not be used to overwrite curated content without review. `archive-originals.mjs` moves source files into the local ignored research archive after optimization.

### Contact

The contact form does not send an HTTP request with visitor data. Browser validation runs locally, then a `mailto:` URL opens the visitor’s email application. The visitor reviews and sends the email there. No “message sent” claim is displayed by the website.

Changing this to a hosted form service, serverless endpoint or CRM changes the data flow and requires corresponding privacy, security, retention and processor reviews.

## Search and AI discoverability

The site is prerendered at build time. Text, image descriptions, navigation and collection information are present in the delivered HTML, including for crawlers that do not execute JavaScript.

Implemented measures include:

- Unique page titles and descriptions, English language declarations and semantic headings.
- Absolute canonical URLs and Open Graph/Twitter metadata.
- JSON-LD for WebSite, WebPage, project CreativeWork, collection ItemList and breadcrumbs, as appropriate to each page.
- A generated XML sitemap and permissive `robots.txt` for public content.
- A real static 404 page with a noindex directive.
- Locally hosted media, explicit image dimensions, lazy loading and static animation posters.
- An informational `llms.txt` describing the project and linking to the public pages.

`llms.txt` is an emerging convention, not a ranking factor or a guarantee of inclusion. Search engines and AI services decide whether and how to crawl, index, cite or display content. Crawl permissions are also affected by hosting and CDN settings.

The original collection is described as 1,000 NFTs, but the published source gallery contains 998 unique artwork images. All 998 available images have been preserved. The gallery initially exposes 24 artworks in HTML; the full archive is available through its interactive search and pagination. This implementation prioritizes the collection page as the search destination. It does not create separate artwork detail URLs.

After production deployment, verify the property in Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`, inspect representative project pages and monitor real-world Core Web Vitals. No invented last-modification timestamps are added to the sitemap.

Implementation guidance was checked against official sources on **20 October 2026**:

- [Google Search: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Search: SEO guidance for developers](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Bing: Sitemaps in AI-powered search](https://blogs.bing.com/webmaster/2025/7/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search/)
- [Tailwind CSS: Vite integration](https://tailwindcss.com/docs/installation/using-vite)
- [Motion: Accessibility](https://motion.dev/docs/react-accessibility)

## Privacy and browser storage

The application installs no analytics, advertising scripts, tracking pixels, session recording, third-party fonts or remote image dependencies. YouTube links open the external site instead of loading a player. The game is also opened as a separate service.

A **cookie and privacy notice appears on the first visit**, on any page, unless a valid saved acknowledgement already exists. The **Accept essential only** button remembers the notice preference; **Privacy settings** opens the detailed dialog, also available from the footer. These actions do not enable tracking. A visitor may also save acknowledgement in that dialog. Only an explicit save writes the following local storage value:

| Key                  | Contents                                                            | Retention                                                      |
| -------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- |
| `soa-privacy-notice` | Notice version and acknowledgement timestamp; no visitor identifier | Up to six months; expired values are removed on the next visit |

Closing the banner or dialog, or continuing without saving, writes nothing and dismisses the notice for the current visit. It may reappear on a subsequent visit. Saved choices are respected across pages and reloads, and expire after six months; invalid or outdated records trigger a fresh notice. If browser storage is unavailable, the site remains usable. This preference does not activate analytics or advertising. Because no non-essential trackers are installed, the UI does not ask visitors to accept fictitious tracking categories.

The application’s lack of tracking does not mean that a hosting or email provider processes no personal data. Technical requests can include IP addresses, browser information and timestamps. Provider configuration and actual data flows must match the published notice.

### Publication review: legal information is not final

The operator requested that the site remain a private individual’s hobby project without disclosing personal identity. The public drafts therefore use the project name **Sons of Art** and `nftsonsofart@gmail.com`.

**This is not a certification of legal compliance.** Where the GDPR applies, Article 13 requires the identity and contact details of the controller. A project name and email address may not satisfy that requirement. Do not interpret the absence of a company or the hobby nature of the project as an automatic exemption.

Before publishing:

1. Resolve the controller identification requirement with qualified advice while respecting the operator’s privacy preferences.
2. Confirm the hosting and email providers, processor arrangements, actual technical log retention and any international transfer safeguards; finalize the privacy notice accordingly.
3. Confirm appropriate retention for contact correspondence and procedures for handling data protection requests.
4. Confirm the right to republish all artwork, photographs, logos, character depictions and associated materials. A public source URL is not a copyright licence.
5. Recheck the cookie inventory against the production deployment, including any hosting integrations or newly added services.

Relevant official guidance:

- [Italian Garante: Cookie and tracking guidelines](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876)
- [Italian Garante: Cookie FAQ](https://www.garanteprivacy.it/faq/cookie)
- [EDPB: Transparency guidelines, including Articles 13 and 14](https://www.edpb.europa.eu/system/files/2023-09/wp260rev01_en.pdf)

## Accessibility and interaction

The interface includes a skip link, semantic landmarks, keyboard focus styling, labeled form fields, accessible accordions, a native privacy dialog and reduced-motion handling. Static posters are used for most animated artwork in overview pages. Filters and gallery search expose result counts to assistive technology.

These measures are implementation features, not a formal WCAG certification. Changes should be checked with keyboard navigation, screen readers, reduced-motion preferences and representative mobile viewports.

## Security and repository hygiene

- Do not commit credentials, access tokens, `.env` files, provider state, local research captures or unoptimized acquisition files.
- `Documenti/` remains ignored because it contains local working material outside the website source.
- Commit `package-lock.json`; use `npm ci` in repeatable environments.
- Keep dependency and hosting configuration reviews current.
- Treat all files under `public/` as publicly downloadable.
- The development server denies access to local research, `Documenti/`, Git data and environment files. It is still a development tool, not a production server.

## Validation

Build before running the artifact audit:

```sh
npm run build
npm run check
```

The audit checks generated pages, local links and assets, metadata, JSON-LD, sitemap coverage, gallery completeness, PDF signatures and the absence of obsolete marketplace or remote media dependencies. Browser verification should additionally cover navigation, collection filters, gallery pagination, contact validation, privacy settings, mobile layout and production hydration.

## Rights and attribution

No open-source licence is granted for this repository or its artwork by this README. Project code, artwork and third-party packages have distinct rights and licences. Review dependency licences and obtain any required permissions before redistribution or commercial reuse.

LUKSO, referenced platforms, brands, characters and design icons belong to their respective rights holders. Their appearance in the project archive does not imply endorsement or affiliation.

**Project contact:** [nftsonsofart@gmail.com](mailto:nftsonsofart@gmail.com)
