import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function useSmoothScroll(wrapper, content, updateCurrent) {
  let media;

  onMounted(() => {
    media = gsap.matchMedia();
    // Keep touch gestures native and respond to motion-preference changes live.
    media.add(
      '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)',
      () => {
        const root = document.documentElement;
        const header = document.querySelector('.site-header');
        root.classList.add('is-smooth');
        const smoother = ScrollSmoother.create({
          wrapper: wrapper.value,
          content: content.value,
          smooth: 0.8,
          smoothTouch: false,
          effects: false,
          onUpdate: updateCurrent,
        });

        function targetFromHash(hash) {
          if (!hash || hash === '#') return null;
          try {
            const target = document.getElementById(
              decodeURIComponent(hash.slice(1)),
            );
            return target && content.value.contains(target) ? target : null;
          } catch {
            return null;
          }
        }

        function scrollToTarget(target, animate) {
          smoother.scrollTo(target, animate, `top ${header.offsetHeight}px`);
          updateCurrent();
        }

        function onAnchorClick(event) {
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          const link = event.target.closest('a[href^="#"]');
          if (
            !link ||
            link.hasAttribute('download') ||
            (link.target && link.target !== '_self')
          )
            return;
          const hash = link.getAttribute('href');
          const target = targetFromHash(hash);
          if (!target) return;
          event.preventDefault();
          if (location.hash !== hash) history.pushState(null, '', hash);
          if (target.id === 'main') target.focus({ preventScroll: true });
          scrollToTarget(target, true);
        }

        function onHashChange() {
          const target = targetFromHash(location.hash);
          if (target) scrollToTarget(target, false);
        }

        document.addEventListener('click', onAnchorClick);
        window.addEventListener('hashchange', onHashChange);
        const initialFrame = requestAnimationFrame(onHashChange);
        let disposed = false;
        document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });

        return () => {
          disposed = true;
          cancelAnimationFrame(initialFrame);
          document.removeEventListener('click', onAnchorClick);
          window.removeEventListener('hashchange', onHashChange);
          smoother.kill();
          root.classList.remove('is-smooth');
          updateCurrent();
        };
      },
      wrapper.value,
    );
  });

  onUnmounted(() => media?.revert());
}
