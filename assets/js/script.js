// Native scrolling keeps trackpads, touch, keyboard, and browser history intact.
const chapters = [...document.querySelectorAll('.chapter')];
const chapterLinks = [...document.querySelectorAll('[data-section]')];
const header = document.querySelector('.site-header');

function markCurrent(id) {
  for (const link of chapterLinks) {
    if (link.dataset.section === id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

let scrollFrame = 0;
function updateCurrent() {
  scrollFrame = 0;
  const marker = header.getBoundingClientRect().height + (window.innerHeight - header.offsetHeight) * .35;
  let current = chapters[0];
  for (const chapter of chapters) {
    if (chapter.getBoundingClientRect().top <= marker) current = chapter;
  }
  markCurrent(current.id);
}

window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateCurrent);
}, { passive: true });
window.addEventListener('resize', updateCurrent);
window.addEventListener('hashchange', updateCurrent);
updateCurrent();
