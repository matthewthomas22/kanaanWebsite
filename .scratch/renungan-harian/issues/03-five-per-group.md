# 03: Browse five devotions at a time

**What to build:** Readers browse bounded groups of five devotions using older/newer controls without accumulating floating cards.

**Blocked by:** 01: Read and share a Renungan Harian.

**Status:** complete

- [x] Initial collection contains the five newest available devotions and identifies the latest as Renungan Terbaru without claiming it is today's.
- [x] Berikutnya replaces the group with the next five older devotions; Sebelumnya returns to the previous newer group.
- [x] Groups contain distinct entries, with at most five cards and no pinned duplicate latest entry.
- [x] Unavailable navigation is disabled or hidden; partial final groups and a collection shorter than five work.
- [x] Returning from reading restores the group, scroll position, and originating card focus, including browser history.
- [x] Verify pagination with additional test-only dated entries; never publish invented devotionals.


