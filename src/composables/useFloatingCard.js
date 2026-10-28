import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

/** A card remains chosen while either the pointer or keyboard focus is inside. */
export function useFloatingCard(element, { index = 0, compact = false } = {}) {
  let hovered = false;
  let focused = false;
  let visible = true;
  let update = () => {};
  let media;
  let observer;
  const setHovered = (value) => {
    hovered = value;
    update();
  };
  const setFocused = (value) => {
    focused = value;
    update();
  };
  const visibilityChanged = () => update();

  onMounted(() => {
    const card = element.value;
    if (!card) return;
    media = gsap.matchMedia();
    media.add(
      {
        mobile: '(max-width: 767px)',
        reduce: '(prefers-reduced-motion: reduce)',
        all: '(min-width: 0px)',
      },
      (context) => {
        const { mobile, reduce } = context.conditions;
        const amount = (mobile ? 0.5 : 1) * (compact ? 0.75 : 1);
        const direction = index % 2 === 0 ? 1 : -1;
        let tweens = [];
        let mode;
        const stop = () => {
          tweens.forEach((tween) => tween.kill());
          tweens = [];
        };
        update = () => {
          const next = reduce
            ? 'still'
            : !visible || document.hidden
              ? 'paused'
              : hovered || focused
                ? 'chosen'
                : 'floating';
          if (next === mode) return;
          mode = next;
          stop();
          card.style.willChange =
            next === 'floating' || next === 'chosen' ? 'transform' : '';
          if (next === 'still') {
            gsap.set(card, { x: 0, y: 0, rotation: 0 });
          } else if (next === 'chosen') {
            tweens.push(
              gsap.to(card, {
                x: 0,
                y: -9 * amount,
                rotation: 0,
                duration: 0.32,
                ease: 'power3.out',
                overwrite: 'auto',
              }),
            );
          } else if (next === 'floating') {
            // Begin at the current pose, so pointer departure never snaps the card.
            tweens.push(
              gsap.to(card, {
                x: direction * 7 * amount,
                duration: 3.6 + index * 0.23,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              }),
            );
            tweens.push(
              gsap.to(card, {
                y: direction * 6 * amount,
                duration: 2.8 + index * 0.31,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              }),
            );
            tweens.push(
              gsap.to(card, {
                rotation: direction * 1.35 * amount,
                duration: 4.2 + index * 0.19,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              }),
            );
          }
        };
        update();
        return () => {
          stop();
          card.style.willChange = '';
        };
      },
    );
    observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(card);
    document.addEventListener('visibilitychange', visibilityChanged);
  });

  onUnmounted(() => {
    observer?.disconnect();
    document.removeEventListener('visibilitychange', visibilityChanged);
    media?.revert();
    update = () => {};
  });

  return {
    onPointerEnter: (event) => {
      if (event.pointerType !== 'touch') setHovered(true);
    },
    onPointerLeave: () => setHovered(false),
    onFocusIn: () => setFocused(true),
    onFocusOut: (event) => {
      if (!element.value?.contains(event.relatedTarget)) setFocused(false);
    },
  };
}
