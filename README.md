# Kanaan Website

A Vue 3 homepage for GKIm Kanaan, built with Vite from the supplied Figma moodboard. Scroll through the church, Kanaan Kids, KYC, and the event template. The production build is a static site; it needs no application server.

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

- `src/App.vue`: homepage composition with header, commission sections, event section, and navigation rail.
- `src/components/`: Vue components for the header, rail, church, Kanaan Kids, KYC, and reusable event placeholders.
- `src/data/navigation.js`: shared labels and section IDs for both navigation controls.
- `src/data/events.js`: the three stable placeholder records. Event names, dates, and images deliberately remain unfilled.
- `src/composables/useActiveSection.js`: reactive tracking of the visible section for navigation.
- `src/composables/useSmoothScroll.js`: GSAP ScrollSmoother setup, section links, and Vue lifecycle cleanup.
- `assets/css/styles.css`: palette, locally hosted fonts, responsive layout, and native fallback scroll snapping.
- `assets/images/kanaan-kids.png`: supplied Kanaan Kids group photo; original source files remain preserved.
- `assets/fonts/`: Cormorant and Inter, with their SIL Open Font Licenses.
- `PRODUCT.md` and `DESIGN.md`: confirmed product context and the implemented design system.

When verified event content is available, extend the event records and pass that content into the shared event card component, with meaningful image alt text and a real heading and date. Until then, preserve the blank placeholders. Add commissions by adding their section component to the homepage and matching IDs to the shared navigation records. Use unique section IDs and the existing chapter styling for active-section tracking.

## Scrolling

GSAP ScrollSmoother adds 0.8-second momentum on devices with a fine pointer and hover support. Header, skip link, and section rail remain fixed outside the transformed page content. Navigation preserves section hashes and browser history, and the current-section marker follows the visible page during smoothing. Desktop CSS snapping is disabled while ScrollSmoother is active so the two systems do not compete.

Touch devices retain native scrolling. Reduced-motion preference skips ScrollSmoother entirely and can be changed while the page is open. Vue unmounting removes the instance and its listeners. See the [official ScrollSmoother documentation](https://gsap.com/docs/v3/Plugins/ScrollSmoother/).

The eight official GSAP agent skills are installed locally for Codex. To install them on another computer, run `npx skills add https://github.com/greensock/gsap-skills --yes --agent codex`. Their source versions are recorded in `skills-lock.json`; local skill directories remain ignored by Git.

## Browser checks

```sh
npm ci
npx playwright install chromium
npm test
```

Tests build the site and start a fresh Vite preview server at http://127.0.0.1:4174; leave that port free. Checks cover 1440px, 390px, and 320px viewports, section and rail links, browser history, desktop momentum and wheel scrolling, native touch scrolling, live reduced-motion changes, image and font loading, reduced motion, keyboard entry, blank event placeholders, and production output isolation. Screenshots are saved under `.impeccable/review/` (ignored by Git). An existing local Chromium browser can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

To host the site, run `npm run build` and upload only the contents of `dist/` to a static host. Relative asset URLs support deployment at either a domain root or a subdirectory. The build includes referenced images and fonts; original artwork, unused image archives, source code, tests, and project documents stay in the repository. Rebuild after source changes. `npm run preview` is for local verification, not a production hosting service. Hosting has not been configured.

## Contents

```text
index.html                      Vite entry and page metadata
src/
  App.vue                       Homepage composition
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

`package.json`, `vite.config.mjs`, and `playwright.config.js` stay at the root as development configuration. `PRODUCT.md` and `DESIGN.md` record product context and design decisions. Vue Router and a global state library are unnecessary for the current single page; navigation uses native section anchors.

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
