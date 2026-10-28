# 04: Browse the complete archive as a list

**What to build:** Readers switch to a complete nonfloating archive, open a devotional, and resume where they left off.

**Blocked by:** 01: Read and share a Renungan Harian.

**Status:** complete

- [x] Tampilkan Semua presents every available devotional as a list with title, date, and opening reflection preview, newest first.
- [x] Selecting a list entry opens the same shareable reading view used by cards.
- [x] Kembali ke Renungan and browser Back restore archive mode, scroll position, and originating entry focus.
- [x] Kembali ke Kartu restores the floating collection and its previous group.
- [x] The archive is readable and keyboard/touch accessible on phones and desktops; it does not inherit idle card motion.
- [x] Verify archive/card switching and return behavior with enough test-only entries to exercise scrolling.

Verification: three focused Playwright fixture tests passed, including 12-entry archive browsing, keyboard opening, exact position/focus restoration, card-group retention, phone/desktop overflow and stillness checks. Rendered screenshots inspected at 390px and 1440px.

