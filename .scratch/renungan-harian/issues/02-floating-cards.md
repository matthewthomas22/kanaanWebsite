# 02: Animate floating cards and the reading transition

**What to build:** Cards visibly float until selected, expand into a still reading view, and return smoothly to their originating collection.

**Blocked by:** 01: Read and share a Renungan Harian.

**Status:** complete

- [x] Use GSAP for continuous X/Y drift, slight rotation, and plausible card shadows.
- [x] Hover and keyboard focus stop the idle motion, straighten the card, and lift it slightly; motion resumes only after both hover and focus have ended.
- [x] Opening visibly expands the selected card while other cards disappear; returning reverses the transition and restores position and focus.
- [x] Preserve readable titles and previews and prevent overlap or clipped content across phone and desktop sizes.
- [x] Use smaller motion on phones; reduced-motion users receive a fully usable still experience, including when preferences change live.
- [x] Clean up animation instances/listeners on unmount, and keep reading text still.
- [x] Verify visible motion, selected state, expansion and reversal, keyboard interaction, reduced motion, and repeated navigation.



Verification: production build passed; five focused browser tests passed for drift, combined pointer/focus selection, live reduced motion, repeated expansion/reversal, phone layout, and scrolled browser Back. Reader expansion uses the selected card geometry and keeps full text at its natural scale.
