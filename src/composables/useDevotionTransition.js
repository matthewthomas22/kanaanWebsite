import { onUnmounted } from 'vue';
import { gsap } from 'gsap';

/** Expands the selected paper surface without scaling the devotional reading text. */
export function useDevotionTransition() {
  let source;
  let animation;
  let surface;
  let settle;
  let activeReader;
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cancel = () => {
    animation?.kill();
    surface?.remove();
    if (activeReader)
      gsap.set(activeReader, { clearProps: 'opacity,visibility' });
    settle?.();
    animation = surface = settle = activeReader = undefined;
  };

  function captureSource(element) {
    if (!element) {
      source = undefined;
      return;
    }
    const box = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    source = {
      box: {
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
      },
      background: style.backgroundColor,
      radius: style.borderRadius,
      shadow: style.boxShadow,
    };
  }

  function transition(reader, closing, target) {
    cancel();
    if (!reader || reduced()) return Promise.resolve();
    const readerBox = reader.getBoundingClientRect();
    const cardBox = target?.getBoundingClientRect() || source?.box;
    if (!cardBox || !cardBox.width || !cardBox.height) return Promise.resolve();
    const from = closing ? readerBox : cardBox;
    const to = closing ? cardBox : readerBox;
    // One fixed sheet carries the geometry; content remains at its natural measure.
    surface = document.createElement('div');
    surface.setAttribute('aria-hidden', 'true');
    surface.dataset.devotionTransition = '';
    Object.assign(surface.style, {
      position: 'fixed',
      left: `${from.left}px`,
      top: `${from.top}px`,
      width: `${from.width}px`,
      height: `${from.height}px`,
      background:
        source?.background || getComputedStyle(reader).backgroundColor,
      borderRadius: source?.radius || '16px',
      boxShadow: source?.shadow || '0 18px 44px rgb(40 18 53 / 14%)',
      pointerEvents: 'none',
      zIndex: '60',
      transformOrigin: 'top left',
      willChange: 'transform, opacity',
    });
    document.body.append(surface);
    activeReader = reader;
    return new Promise((resolve) => {
      settle = resolve;
      animation = gsap.timeline({
        defaults: { duration: 0.5, ease: 'expo.out' },
        onComplete: () => {
          gsap.set(reader, { clearProps: 'opacity,visibility' });
          surface?.remove();
          surface = animation = settle = activeReader = undefined;
          resolve();
        },
      });
      if (!closing) gsap.set(reader, { autoAlpha: 0 });
      animation.to(
        surface,
        {
          x: to.left - from.left,
          y: to.top - from.top,
          scaleX: to.width / from.width,
          scaleY: to.height / from.height,
        },
        0,
      );
      if (closing) {
        animation.to(reader, { autoAlpha: 0, duration: 0.16 }, 0);
        animation.to(surface, { autoAlpha: 0, duration: 0.12 }, 0.39);
      } else {
        animation.to(reader, { autoAlpha: 1, duration: 0.2 }, 0.22);
        animation.to(surface, { autoAlpha: 0, duration: 0.2 }, 0.26);
      }
    });
  }

  const preferenceChanged = (event) => {
    if (event.matches) cancel();
  };
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  preference.addEventListener('change', preferenceChanged);
  onUnmounted(() => {
    cancel();
    preference.removeEventListener('change', preferenceChanged);
  });

  return {
    captureSource,
    enter: (reader) => transition(reader, false),
    leave: (reader, target) => transition(reader, true, target),
  };
}
