# Kanaan Website

A static homepage for GKIm Kanaan, built with HTML, CSS, and JavaScript from the supplied Figma moodboard. Scroll through the church, Kanaan Kids, KYC, and the event template.

## Preview the website

Open `index.html` directly, or install Node.js and run:

```sh
npm run dev
```

Visit http://localhost:4173. No runtime dependencies or build step are required. The local server exposes only website files and assets.

## Edit the homepage

- `index.html`: section content, navigation, and three event placeholders. Event names, dates, and images deliberately remain unfilled.
- `assets/css/styles.css`: palette, locally hosted fonts, responsive layout, and native scroll snapping.
- `assets/js/script.js`: tracks the active section in the navigation.
- `assets/images/kanaan-kids.png`: supplied Kanaan Kids group photo; original source files remain preserved.
- `assets/fonts/`: Cormorant and Inter, with their SIL Open Font Licenses.
- `PRODUCT.md` and `DESIGN.md`: confirmed product context and the implemented design system.

Update an event by replacing its `.event-poster` placeholder with a poster image and meaningful alt text, and its `.blank-details` with an actual heading and date. Remove the placeholder notice only when the details are ready. Add commissions by adding a section and matching links with `data-section` attributes; section tracking detects them automatically.

## Browser checks

```sh
npm ci
npx playwright install chromium
npm test
```

Checks cover 1440px, 390px, and 320px viewports, section links, desktop wheel scrolling, asset loading, reduced motion, and keyboard entry. Screenshots are saved under `.impeccable/review/` (ignored by Git). An existing local browser can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

To host the site, upload `index.html` and `assets/` to a static host. Hosting has not been configured.

## Contents

```text
index.html                      Homepage
assets/
  css/                          Stylesheets
  js/                           Browser JavaScript
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
```

`serve.js`, `package.json`, and `playwright.config.js` stay at the root as development configuration. `PRODUCT.md` and `DESIGN.md` record product context and design decisions.

Original filenames and image variants are preserved. The root `Foto Profil Kanaan Kids.af` and its editor lock remain together because the lock may belong to an open editing session. After closing the design application, that artwork can be moved to `design-files/`; it is a separate version from the artwork in `design-files/kanaan-kids/`.

## Continue on a MacBook

Clone the repository:

```sh
git clone https://github.com/matthewthomas22/kanaanWebsite.git
cd kanaanWebsite
```

Images can be viewed directly. Use a compatible design application to edit `.af` files.
The site runs without dependency installation. Browser tests use the development dependencies in `package.json` and `package-lock.json`.

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
