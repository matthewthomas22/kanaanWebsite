<script setup>
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import HomePage from './components/HomePage.vue';
import SiteHeader from './components/SiteHeader.vue';
import DevotionsPage from './components/DevotionsPage.vue';
import { devotions, devotionUrl } from './data/devotions.js';
import { useDevotionTransition } from './composables/useDevotionTransition.js';

const { captureSource, enter, leave } = useDevotionTransition();
function readRoute() {
  const query = new URLSearchParams(location.search);
  return {
    page: query.get('page') === 'renungan' ? 'renungan' : 'home',
    slug: query.get('devotion'),
  };
}
const route = ref(readRoute());
const collectionState = reactive({
  group: 0,
  mode: 'cards',
  scroll: 0,
  focus: '',
});
const originalTitle = document.title;
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
  route.value = readRoute();
  if (history.state?.renungan)
    Object.assign(collectionState, history.state.renungan);
  const devotional = devotions.find((item) => item.slug === route.value.slug);
  document.title =
    route.value.page === 'home'
      ? originalTitle
      : `${devotional?.title || 'Renungan Harian'} — GKIm Kanaan`;
  await nextTick();
  const position = restore ? history.state?.position : null;
  await new Promise((resolve) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        window.scrollTo({ top: position?.scroll || 0, behavior: 'instant' });
        const target = position?.focus
          ? document.getElementById(position.focus)
          : document.querySelector('[data-devotion-reader]');
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
  captureSource(event?.currentTarget);
  savePosition();
  history.pushState(
    { renungan: { ...collectionState }, devotionalOrigin: true },
    '',
    devotionUrl(devotion.slug),
  );
  await syncRoute();
  await enter(document.querySelector('[data-devotion-reader]'));
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
  await leave(document.querySelector('[data-devotion-reader]'));
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
  if (route.value.slug && route.value.slug !== readRoute().slug && !navigating)
    await leave(document.querySelector('[data-devotion-reader]'));
  await syncRoute(true);
  if (route.value.slug)
    await enter(document.querySelector('[data-devotion-reader]'));
  navigating = false;
}
onMounted(() => {
  window.addEventListener('popstate', onPopState);
  if (route.value.page !== 'home') syncRoute();
});
onUnmounted(() => window.removeEventListener('popstate', onPopState));
</script>

<template>
  <a
    class="skip-link fixed top-2.5 left-4 z-30 -translate-y-[160%] bg-warm-white px-5 py-3 focus:translate-y-0"
    href="#main"
    >Lewati navigasi</a
  >
  <HomePage
    v-if="route.page === 'home'"
    @open-devotion="openDevotion"
    @open-collection="openCollection"
  />
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
</template>
