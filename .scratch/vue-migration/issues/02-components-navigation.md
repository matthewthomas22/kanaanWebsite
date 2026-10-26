# 02: Make navigation and commission sections reusable

**What to build:** Visitors navigate between GKIm Kanaan, Kanaan Kids, KYC, and Acara through synchronized header and rail controls. Vue components organize the existing church and commission content without changing its appearance.

**Blocked by:** 01: Run the complete homepage on Vue and Vite.

**Status:** complete

- [x] Header and rail share one navigation definition and reactive current-section state.
- [x] Church, Kanaan Kids, and KYC content use focused Vue components.
- [x] Native scrolling, anchor navigation, keyboard access, and reduced motion remain intact.
- [x] Browser event listeners and pending animation callbacks are cleaned up with Vue lifecycle hooks.
