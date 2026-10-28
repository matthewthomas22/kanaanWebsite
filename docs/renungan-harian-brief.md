# Renungan Harian

Status: complete. All five tickets implemented, verified, and reviewed.

## Confirmed decisions

- Create a dedicated Renungan Harian page within the existing GKIm Kanaan website.
- Add Renungan Harian to the main navigation. Give each devotional a shareable URL, support direct entry into its reading view, and support browser Back. Returning from a directly opened devotional leads to the collection when no collection history exists.
- Cards show the devotional title, date, and a short text preview.
- Derive the preview from the opening reflection paragraph after the verse and reading reference, displaying two or three lines.
- Use GSAP for continuous movement in X and Y with slight rotation. Add plausible shadows to convey floating cards.
- Hovering or keyboard-focusing a card selects it visually: stop the default drifting/rotation, straighten it, and lift it slightly on the Y axis. Resume the default floating animation when interaction ends. The reading view stays still. Use smaller movement and safe spacing on phones, and respect reduced-motion preferences.
- Start the floating collection with the five newest devotions. “Berikutnya” replaces the current group with the next five older devotions rather than appending more floating cards. Keep the newest available devotional in the initial group; use “Renungan Terbaru” rather than assuming it is dated today.
- Provide “Sebelumnya” to return to newer groups. Each group contains distinct devotions; the newest is not pinned in every group. Hide or disable unavailable group navigation at either end.
- Provide a “Tampilkan Semua” option presenting the archive as a list of titles, dates, and short text previews rather than floating cards.
- Archive entries open the same reading view. Closing a devotion restores the originating list or card group and its scroll position. The archive includes “Kembali ke Kartu” to restore the floating collection.
- Clicking a card expands it into a spacious reading view and hides the other cards. A visible “Kembali ke Renungan” button reverses the transition and restores the reader’s position in the collection.
- Preserve the supplied devotional text. Place the complete heading, such as “Santapan Rohani Rabu, 28 Oktober 2026”, at the top right. Treat the text between WhatsApp asterisks as the devotional title, removing the formatting markers from display. Set the remaining content as readable text with paragraph breaks and left alignment.
- Give typography particular care, using the established site identity as the starting point.
- A dedicated admin page for church staff to edit, update, and manage the website is future work. The first version should keep devotional content separate from its presentation; no backend or admin architecture has been selected.

## Landing-page addition

- Place a Renungan Harian section immediately after Jadwal Kebaktian and before Kanaan Kids.
- Keep the composition simple: a section title and three small floating cards representing the newest devotions.
- Reuse the established card content and GSAP motion behavior at the smaller scale. Preserve readable previews and comfortable tap targets on phones.
- Clicking a preview opens its devotional reading view on the dedicated page; “Lihat Semua Renungan” opens the dedicated collection. Returning to the landing page should restore the visitor’s position.

## Evidence

- `Contoh Renungan Pagi.txt` contains five devotional examples dated 24–28 October 2026.
- Existing site uses Vue, Vite, and GSAP, with static deployment and homepage anchor navigation.
- Established typography uses Cormorant headings and Inter body text, with purple, ivory, and gold colors. Floating card shadows are explicitly requested for this new page.

## Confirmation

The user confirmed the full page behavior and landing-page connection, approved the five-ticket breakdown, and requested one sub-agent per ticket. All five tickets have been implemented.

No ADR yet: no hard-to-reverse architecture choice has been made.

## Verification

- Production build and formatting checks pass.
- Main Playwright suite: 19 tests pass, covering existing homepage behavior and devotional reading, links/history, motion, landing previews, responsive layouts, and reduced motion.
- Isolated fixture suite: four tests pass, covering archive restoration and five-entry pagination with 12 test-only entries. Extra entries are excluded from the production build.
- Two timing-sensitive motion checks each passed three consecutive runs after waiting for navigation/transition completion.
- All five devotional bodies match the supplied source text after normalizing whitespace; annual-reading line breaks remain actual newline characters.
- Independent Standards and Spec reviews report no material findings against the pre-implementation commit.
- Visual review covered desktop, phone, narrow phone, and short landscape captures of collection, reader, archive, and landing section. The sole material finding, short-landscape spacing, was fixed and scored resolved in the follow-up review.
