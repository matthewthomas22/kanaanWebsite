# Kanaan Website

A Vue 3 website for GKIm Kanaan, built with Vite from the supplied Figma moodboard. The homepage introduces the church, Jadwal Kebaktian, Renungan Harian, Kanaan Kids, KYC, and the event template. The production build is a static site; it needs no application server.

## Renungan Harian

Open Renungan Harian from the main navigation or the three devotional previews after Jadwal Kebaktian. The dedicated collection shows five newest-first cards at a time. Use “Berikutnya” for older devotions, “Sebelumnya” for newer ones, or “Tampilkan Semua” for the complete archive list.

Each devotional has a shareable query URL that works on static hosting without server route rewrites. Opening an entry expands it into a reading view; returning restores the originating card group, archive list, or homepage position. GSAP supplies gentle floating motion and the reading transition, with a still experience for reduced-motion preferences.

The five initial entries preserve the supplied WhatsApp devotional examples. Devotional content is separate from presentation; adding or correcting entries currently requires editing the content and rebuilding. A staff admin page is future work. No authentication, publishing scheduler, database, or content-management backend is included.

## Preview the website

Install a current supported Node.js LTS release and run:

```sh
npm ci
npm run dev
```

Visit http://127.0.0.1:4173. Vite serves the Vue source during development; opening `index.html` directly is no longer supported.

To preview the production website:

```sh
npm run build
npm run preview
```

Preview uses the same address. Stop the development server before starting preview on that port.

## Edit the homepage

- `src/App.vue`: devotional query navigation, browser history, and restoration of the originating view.
- `src/components/HomePage.vue`: homepage composition with header, commission sections, event section, and navigation rail.
- `src/components/`: Vue components for the header, rail, church, Kanaan Kids, KYC, and reusable event placeholders.
- `src/data/navigation.js`: shared labels and section IDs for both navigation controls.
- `src/data/events.js`: the three stable placeholder records. Event names, dates, and images deliberately remain unfilled.
- `src/data/devotions.js`: devotional records with a stable slug, ISO date, display date, full date heading, title, opening reflection preview, and complete text paragraphs. Keep slugs stable so shared links continue to work; add new entries in newest-first order.
- `src/composables/useActiveSection.js`: reactive tracking of the visible section for navigation.
- `src/composables/useSmoothScroll.js`: GSAP ScrollSmoother setup, section links, and Vue lifecycle cleanup.
- `assets/css/styles.css`: Tailwind theme, locally hosted fonts, and the small shared global styling layer.
- `assets/images/kanaan-kids.png`: supplied Kanaan Kids group photo; original source files remain preserved.
- `assets/images/worship-2026/`: four user-supplied Good Friday and Easter 2026 photographs, displayed as the opening banner's static collage under a purple overlay. Each has 600px and 1200px JPEG variants; the browser selects a suitable size. Original source paths are embedded in the JPEG metadata. Source photographs remain in `D:\Downloads\Foto GKIm Kanaan\Kebaktian Umum`.
- `assets/fonts/`: Cormorant and Inter, with their SIL Open Font Licenses.
- `PRODUCT.md` and `DESIGN.md`: confirmed product context and the implemented design system.

When verified event content is available, extend the event records and pass that content into the shared event card component, with meaningful image alt text and a real heading and date. Until then, preserve the blank placeholders. Add commissions by adding their section component to the homepage and matching IDs to the shared navigation records. Use unique section IDs and the existing chapter styling for active-section tracking.

## Edit styling with Tailwind

The homepage uses Tailwind CSS v4 through Vite. Edit each component's `class` attributes to change its spacing, typography, alignment, colors, and layout. The component list above maps the visible sections to their source files. No separate Tailwind configuration file is needed.

For a site-wide color or font change, edit `@theme` in `assets/css/styles.css`. For example, `--color-purple` supplies `bg-purple`, `text-purple`, and `border-purple`; `--font-display` supplies `font-display`. Keep local font files and their `@font-face` rules together when changing fonts.

Utilities without a prefix apply at every screen size. `sm:` applies from 640px, `md:` from 768px, and `lg:` from 1024px. Start with the phone layout, then add larger-screen variants: `grid-cols-1 lg:grid-cols-2` stacks content below 1024px. Fluid `clamp(...)` sizes let headings grow within explicit limits. Keep complete utility names in source rather than assembling pieces dynamically so Tailwind can discover them.

The shared `--header`, `--gutter`, and `--rail` variables in the base layer control the fixed-header offset, page inset, and space reserved for the desktop navigation rail. Edit these values together with the matching header utilities. Below 768px the rail is hidden and has no reserved width; the top navigation remains visible. Sections use minimum heights instead of fixed heights, images preserve their proportions, and section footers stay in normal document flow so longer content can push them down.

The remaining custom CSS handles local font loading, base text/SVG defaults, keyboard focus, shared chapter geometry, smooth-scroll integration, and reduced-motion preferences. Section layouts and interactive decoration live in their Vue templates. Preserve these shared behaviors when restyling. Check phone, tablet, short landscape, desktop, and wide layouts after changing content or heading sizes.

## Scrolling

GSAP ScrollSmoother adds 0.8-second momentum on devices with a fine pointer and hover support. Header, skip link, and section rail remain fixed outside the transformed page content. Navigation preserves section hashes and browser history, and the current-section marker follows the visible page during smoothing. Chapters have a minimum height and grow with their content; scrolling does not snap between sections.

Touch devices retain native scrolling. Reduced-motion preference skips ScrollSmoother entirely and can be changed while the page is open. Vue unmounting removes the instance and its listeners. See the [official ScrollSmoother documentation](https://gsap.com/docs/v3/Plugins/ScrollSmoother/).

The eight official GSAP agent skills are installed locally for Codex. To install them on another computer, run `npx skills add https://github.com/greensock/gsap-skills --yes --agent codex`. Their source versions are recorded in `skills-lock.json`; local skill directories remain ignored by Git.

## Browser checks

Playwright checks cover the homepage and Renungan Harian browser flows. Run:

```sh
npm ci
npx playwright install chromium
npm test
```

Tests build the site and start a fresh Vite preview server at http://127.0.0.1:4174; leave that port free. The suite covers 320px, 390px, 768px, 844px landscape, 1440px, and 1920px viewports, section and rail links, browser history, desktop momentum and wheel scrolling, native touch scrolling, live reduced-motion changes, image and font loading, reduced motion, keyboard entry, blank event placeholders, devotional reading and motion, landing previews, and production output isolation. Screenshots are saved under `.impeccable/review/` (ignored by Git). An existing local Chromium browser can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

For archive and pagination checks with more than five entries, run `npx playwright test --config tests/playwright.devotions-fixture.config.js`. This builds an isolated test site under `.scratch/renungan-harian/test-dist/` and serves it on port 4175. Its extra devotional entries are test fixtures and are never included in the normal production build.

To host the site, run `npm run build` and upload only the contents of `dist/` to a static host. Relative asset URLs support deployment at either a domain root or a subdirectory. The build includes referenced images and fonts; original artwork, unused image archives, source code, tests, and project documents stay in the repository. Rebuild after source changes. `npm run preview` is for local verification, not a production hosting service. Hosting has not been configured.

## Contents

```text
index.html                      Vite entry and page metadata
src/
  App.vue                       Page navigation and devotional history
  components/                   Vue sections and shared components
  composables/                  Active-section tracking
  data/                         Navigation and event placeholder records
assets/
  css/                          Stylesheets
  fonts/                        Local fonts and licenses
  images/
    kanaan-kids.png              Homepage group photo
    icons/                      Social media icons and variants
    decorations/                Illustrated words and frames
    portraits/                  Teacher portraits
    references/                 Website sketch and color screenshots
    kanaan-kids-profiles/        Original profile exports and cutouts
design-files/
  kanaan-kids/                   Editable profile artwork
tests/                         Browser checks
dist/                          Generated static site (ignored by Git)
```

`package.json`, `vite.config.mjs`, and `playwright.config.js` stay at the root as development configuration. `PRODUCT.md` and `DESIGN.md` record product context and design decisions. Homepage navigation uses native section anchors; Renungan Harian uses shareable query URLs without a routing-library dependency.

Original filenames and image variants are preserved. The root `Foto Profil Kanaan Kids.af` and its editor lock remain together because the lock may belong to an open editing session. After closing the design application, that artwork can be moved to `design-files/`; it is a separate version from the artwork in `design-files/kanaan-kids/`.

## Continue on a MacBook

Clone the repository:

```sh
git clone https://github.com/matthewthomas22/kanaanWebsite.git
cd kanaanWebsite
```

Images can be viewed directly. Use a compatible design application to edit `.af` files.
Run `npm ci` after cloning, then `npm run dev`. Dependency versions are recorded in `package-lock.json` for consistent installation on both computers.

Install any AI or editor tools separately on each computer. Their local installation
folders and settings are excluded from Git, including Windows executables.

## Work between computers

Before starting work on either computer:

```sh
git pull --ff-only
```

After finishing a set of changes:

```sh
git status
git add <files-you-changed>
git diff --cached --stat
git commit -m "Describe the change"
git push
```

Commit source files, required assets, shared configuration, and documentation.
Temporary design locks, operating system metadata, dependencies, generated output,
local tool installations, and secrets are ignored. Transfer any future environment
secrets separately and commit only placeholder examples such as `.env.example`.
