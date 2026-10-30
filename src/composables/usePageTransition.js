import { onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

// Cover route teardown and scroll restoration before revealing the next page.
export function usePageTransition(cover) {
  let pending;

  async function run(changePage) {
    if (pending) await pending;
    const element = cover.value;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!element || reduced) return changePage();

    pending = (async () => {
      element.style.pointerEvents = 'auto';
      element.style.backdropFilter = 'blur(6px)';
      await gsap.to(element, {
        opacity: 1,
        duration: 0.18,
        ease: 'power1.out',
      });
      try {
        await changePage();
      } finally {
        await gsap.to(element, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
        gsap.set(element, {
          clearProps: 'pointerEvents,backdropFilter,opacity',
        });
      }
    })();
    try {
      await pending;
    } finally {
      pending = undefined;
    }
  }

  onBeforeUnmount(() => cover.value && gsap.killTweensOf(cover.value));
  return { run };
}
