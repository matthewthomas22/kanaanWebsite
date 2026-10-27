# 05: Retire superseded CSS and verify the complete homepage

**What to build:** Editors have a clear styling guide and visitors have one consistent responsive homepage with superseded legacy rules removed.

**Blocked by:** 02: Make Kanaan Kids responsive with Tailwind; 03: Make KYC responsive with Tailwind; 04: Make events responsive with Tailwind.

**Status:** implemented (build and rendered checks skipped)

- [x] Remove migrated legacy styling, retaining only justified global and effect rules.
- [x] Document theme edits, component utilities, responsive variants, and preserved custom CSS.
- [ ] Check the full homepage at phone, tablet, landscape, desktop, and wide widths with available non-Playwright tooling.
- [x] Inspect navigation, focus, and reduced-motion source; report verification gaps. Build explicitly skipped by the user.
- [x] Run independent standards and spec reviews and address actionable findings.

## Validation notes

README now includes the Tailwind editing guide and DESIGN records the responsive system. Existing browser checks use semantic selectors and include phone, tablet, short landscape, desktop, and wide cases. They were not executed: the user explicitly excluded Playwright and subsequently excluded the production build. JavaScript syntax and all Vue templates pass compiler checks. Legacy component rules have been removed; shared font/base/focus/chapter/scroll and reduced-motion behavior remain. Native Chrome access timed out at approval, so no rendered viewport, overlap, focus, or scrolling checks were completed. Responsive verification is limited to source inspection and template compilation. Independent Standards review found a focus-offset inconsistency, now fixed to the documented 6px. Independent Spec review found no implementation gaps.
