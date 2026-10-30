<script setup>
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import HomePage from './components/HomePage.vue';
import SiteHeader from './components/SiteHeader.vue';
import DevotionsPage from './components/DevotionsPage.vue';
import { devotions, devotionUrl } from './data/devotions.js';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageTransition } from './composables/usePageTransition.js';
function readRoute() {
  const query = new URLSearchParams(location.search);
  return {
    page: query.get('page') === 'renungan' ? 'renungan' : 'home',
    slug: query.get('devotion'),
  };
}
const route = ref(readRoute());
const pageCover = ref(null);
const pageTransition = usePageTransition(pageCover);
const collectionState = reactive({
  group: 0,
  mode: 'cards',
  scroll: 0,
  focus: '',
});
const originalTitle = document.title;
const originalScrollRestoration = history.scrollRestoration;
let navigating = false;
function plainClick(event) {
  return (
    !event ||
    (event.button === 0 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      !event.altKey)
  );
}
function savePosition() {
  history.replaceState(
    {
      ...history.state,
      renungan: { ...collectionState },
      position: { scroll: scrollY, focus: document.activeElement?.id || '' },
    },
    '',
  );
}
function updateCollection(patch) {
  Object.assign(collectionState, patch);
  history.replaceState(
    { ...history.state, renungan: { ...collectionState } },
    '',
  );
}
async function syncRoute(restore = false) {
  if (route.value.page !== readRoute().page) {
    return pageTransition.run(() => applyRoute(restore));
  }
  return applyRoute(restore);
}
async function applyRoute(restore = false) {
  const previousPage = route.value.page;
  route.value = readRoute();
  if (history.state?.renungan)
    Object.assign(collectionState, history.state.renungan);
  const devotional = devotions.find((item) => item.slug === route.value.slug);
  document.title =
    route.value.page === 'home'
      ? originalTitle
      : `${devotional?.title || 'Renungan Harian'} — GKIm Kanaan`;
  await nextTick();
  // Reading is a dialog over the mounted collection: leave its scroll untouched.
  if (route.value.page === 'renungan' && route.value.slug) return;
  if (
    previousPage === 'renungan' &&
    route.value.page === 'renungan' &&
    !restore
  )
    return;
  const position = restore ? history.state?.position : null;
  await new Promise((resolve) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        const smoother = ScrollSmoother.get();
        let anchor;
        if (!position && route.value.page === 'home' && location.hash) {
          try {
            anchor = document.getElementById(
              decodeURIComponent(location.hash.slice(1)),
            );
          } catch {
            // Ignore malformed fragment identifiers.
          }
        }
        if (anchor && smoother) {
          const header = document.querySelector('.site-header');
          smoother.scrollTo(
            anchor,
            false,
            `top ${header?.offsetHeight || 0}px`,
          );
        } else if (anchor) anchor.scrollIntoView({ behavior: 'instant' });
        else if (smoother) smoother.scrollTop(position?.scroll || 0);
        else
          window.scrollTo({ top: position?.scroll || 0, behavior: 'instant' });
        const target = position?.focus
          ? document.getElementById(position.focus)
          : anchor || document.getElementById('main');
        target?.focus({ preventScroll: true });
        resolve();
      }),
    ),
  );
}
async function openDevotion(devotion, event) {
  if (!plainClick(event)) return;
  event?.preventDefault();
  event?.currentTarget?.focus({ preventScroll: true });
  savePosition();
  history.pushState(
    { renungan: { ...collectionState }, devotionalOrigin: true },
    '',
    devotionUrl(devotion.slug),
  );
  await syncRoute();
}
async function openCollection(event) {
  if (!plainClick(event)) return;
  event?.preventDefault();
  savePosition();
  history.pushState({ renungan: { ...collectionState } }, '', devotionUrl());
  await syncRoute();
}
async function back() {
  if (navigating) return;
  navigating = true;
  if (history.state?.devotionalOrigin) {
    history.back();
    return;
  } else {
    history.replaceState(
      { renungan: { ...collectionState } },
      '',
      devotionUrl(),
    );
    await syncRoute();
  }
  navigating = false;
}
async function onPopState() {
  // Homepage hash navigation belongs to its native/ScrollSmoother anchor handler.
  if (route.value.page === 'home' && readRoute().page === 'home') return;
  await syncRoute(true);
  navigating = false;
}
// Delegate internal page links here so every page uses the shared transition.
async function onPageLink(event) {
  if (event.defaultPrevented || !plainClick(event)) return;
  const link = event.target.closest('a[href]');
  if (
    !link ||
    link.hasAttribute('download') ||
    (link.target && link.target !== '_self')
  )
    return;
  const destination = new URL(link.href, location.href);
  const normalizePath = (path) => path.replace(/index\.html$/, '');
  if (
    destination.origin !== location.origin ||
    normalizePath(destination.pathname) !== normalizePath(location.pathname)
  )
    return;
  const page =
    destination.searchParams.get('page') === 'renungan' ? 'renungan' : 'home';
  if (page === route.value.page) return;
  event.preventDefault();
  savePosition();
  history.pushState({ renungan: { ...collectionState } }, '', destination.href);
  await syncRoute();
}
onMounted(() => {
  history.scrollRestoration = 'manual';
  document.addEventListener('click', onPageLink);
  window.addEventListener('popstate', onPopState);
  if (route.value.page !== 'home') syncRoute();
});
onUnmounted(() => {
  document.removeEventListener('click', onPageLink);
  window.removeEventListener('popstate', onPopState);
  history.scrollRestoration = originalScrollRestoration;
});
</script>

<template>
  <a
    class="skip-link fixed top-2.5 left-4 z-30 -translate-y-[160%] bg-warm-white px-5 py-3 focus:translate-y-0"
    href="#main"
    >Lewati navigasi</a
  >
  <HomePage v-if="route.page === 'home'" @open-collection="openCollection" />
  <template v-else>
    <SiteHeader devotional-page @open-collection="openCollection" />
    <DevotionsPage
      :devotional="devotions.find((item) => item.slug === route.slug) || null"
      :invalid="
        Boolean(route.slug) &&
        !devotions.some((item) => item.slug === route.slug)
      "
      :collection-state="collectionState"
      @open="openDevotion"
      @back="back"
      @update-collection="updateCollection"
    />
  </template>
  <div ref="pageCover" class="page-reveal" aria-hidden="true"></div>
</template>

<style scoped>
.page-reveal {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  background: var(--color-warm-white);
}
</style>
