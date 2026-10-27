import { onMounted, onUnmounted, ref } from 'vue';
import { navigation } from '../data/navigation.js';

export function useActiveSection() {
  const currentSection = ref(navigation[0].id);
  let scrollFrame = 0;
  let chapters = [];
  let header;

  function updateCurrent() {
    if (!header || !chapters.length) return;
    const headerHeight = header.getBoundingClientRect().height;
    const marker =
      headerHeight + (window.innerHeight - header.offsetHeight) * 0.35;
    let current = chapters[0];
    for (const chapter of chapters) {
      if (chapter.getBoundingClientRect().top <= marker) current = chapter;
    }
    currentSection.value = current.id;
  }

  function scheduleUpdate() {
    if (!scrollFrame)
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        updateCurrent();
      });
  }

  onMounted(() => {
    chapters = [...document.querySelectorAll('.chapter')];
    header = document.querySelector('.site-header');
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);
    updateCurrent();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', scheduleUpdate);
    window.removeEventListener('resize', scheduleUpdate);
    window.removeEventListener('hashchange', scheduleUpdate);
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
  });

  return { currentSection, updateCurrent };
}
