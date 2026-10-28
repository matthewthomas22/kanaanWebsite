import { devotions as suppliedDevotions } from '../../src/data/devotions.js';
export { devotionUrl } from '../../src/data/devotions.js';

// These deliberately labelled entries exist only in the fixture build.
export const devotions = [
  ...suppliedDevotions,
  ...[23, 22, 21, 20, 19, 18, 17].map((day) => ({
    slug: `fixture-${day}`,
    title: `Bacaan uji ${day}`,
    date: `2026-10-${day}`,
    dateLabel: `${day} Oktober 2026`,
    heading: `Bacaan khusus pengujian, ${day} Oktober 2026`,
    preview: `Pratinjau khusus pengujian untuk tanggal ${day}.`,
    paragraphs: [`Isi khusus pengujian untuk tanggal ${day}.`],
  })),
];
