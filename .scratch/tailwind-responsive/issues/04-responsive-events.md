# 04: Make events responsive with Tailwind

**What to build:** Visitors see event placeholders in a grid suited to the available width and can return to the church section.

**Blocked by:** 01: Introduce Tailwind through the header, navigation, and church hero.

**Status:** implemented

- [x] Migrate the event section and shared cards to Tailwind utilities.
- [x] Keep titles, dates, and event details blank until verified content exists.
- [x] Preserve accessible placeholder descriptions and keyboard navigation.
- [x] Prevent squeezed cards and footer overlap on phones, tablets, and landscape screens.

**Validation:** Both Vue components pass direct SFC script/template compilation. Layout uses 84px poster rows on phones, two columns from the small breakpoint, and three columns from the large breakpoint. Section height grows with content and the footer remains in document flow. The user skipped Playwright and the production build. Native Chrome access timed out; rendered responsive behavior remains unverified.
