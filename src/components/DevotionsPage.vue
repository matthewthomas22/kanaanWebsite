<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devotions, devotionUrl } from '../data/devotions.js';
import { useSmoothScroll } from '../composables/useSmoothScroll.js';
import DevotionCard from './DevotionCard.vue';
const props = defineProps({
  devotional: { type: Object, default: null },
  invalid: Boolean,
  collectionState: { type: Object, required: true },
});
const emit = defineEmits(['open', 'back', 'update-collection']);
const collectionHeading = ref(null);
const readerDialog = ref(null);
const reader = ref(null);
const wrapper = ref(null);
const content = ref(null);
useSmoothScroll(wrapper, content);
let previousOverflow;

watch(
  () => props.devotional,
  async (devotional) => {
    await nextTick();
    const dialog = readerDialog.value;
    if (devotional && dialog && !dialog.open) {
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
      reader.value?.focus({ preventScroll: true });
    } else if (!devotional && dialog?.open) {
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
      previousOverflow = undefined;
    }
  },
  { immediate: true, flush: 'post' },
);

onUnmounted(() => {
  if (previousOverflow !== undefined)
    document.documentElement.style.overflow = previousOverflow;
});

function closeFromBackdrop(event) {
  if (event.target !== readerDialog.value) return;
  const box = readerDialog.value.getBoundingClientRect();
  if (
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom
  )
    emit('back');
}

const archiveMode = computed(() => props.collectionState.mode === 'archive');
const groupSize = 5;
const lastGroup = computed(() =>
  Math.max(0, Math.ceil(devotions.length / groupSize) - 1),
);
const group = computed(() =>
  Math.min(Math.max(0, props.collectionState.group || 0), lastGroup.value),
);
const visibleDevotions = computed(() =>
  devotions.slice(group.value * groupSize, (group.value + 1) * groupSize),
);

async function changeGroup(nextGroup) {
  if (nextGroup < 0 || nextGroup > lastGroup.value) return;
  emit('update-collection', { group: nextGroup, focus: '', scroll: 0 });
  await nextTick();
  ScrollTrigger.refresh();
  collectionHeading.value?.focus({ preventScroll: true });
  collectionHeading.value?.scrollIntoView({
    block: 'start',
    behavior: 'instant',
  });
}

async function changeMode(mode) {
  // Keep history fields primitive: reactive nested objects cannot be cloned by history.
  const previousMode = props.collectionState.mode;
  const destinationScroll = props.collectionState[`${mode}Scroll`];
  const destinationFocus = props.collectionState[`${mode}Focus`];
  emit('update-collection', {
    mode,
    [`${previousMode}Scroll`]: window.scrollY,
    [`${previousMode}Focus`]: document.activeElement?.id || '',
    scroll: destinationScroll || 0,
    focus: destinationFocus || '',
  });
  await nextTick();
  ScrollTrigger.refresh();
  if (destinationScroll !== undefined) {
    window.scrollTo({ top: destinationScroll, behavior: 'instant' });
    document.getElementById(destinationFocus)?.focus({ preventScroll: true });
  } else {
    collectionHeading.value?.focus({ preventScroll: true });
    collectionHeading.value?.scrollIntoView({
      block: 'start',
      behavior: 'instant',
    });
  }
}
</script>

<template>
  <div id="smooth-wrapper" ref="wrapper">
    <div id="smooth-content" ref="content">
      <main
        id="main"
        tabindex="-1"
        class="min-h-screen pt-[var(--header)] focus:outline-none"
      >
        <div v-if="invalid" class="mx-auto max-w-3xl px-[var(--gutter)] py-20">
          <h1 class="font-display text-5xl">Renungan tidak ditemukan</h1>
          <p class="my-6 text-muted">
            Tautan renungan ini tidak tersedia. Silakan pilih bacaan dari
            koleksi Renungan Harian.
          </p>
          <button
            class="min-h-11 underline underline-offset-4"
            @click="$emit('back')"
          >
            Kembali ke Renungan
          </button>
        </div>
        <section
          v-else
          class="min-h-[calc(100svh-var(--header))] bg-ivory/45 px-[var(--gutter)] py-12 sm:py-20 [@media(max-height:500px)]:py-5"
        >
          <div class="mx-auto max-w-6xl">
            <h1
              ref="collectionHeading"
              tabindex="-1"
              class="scroll-mt-[calc(var(--header)+2rem)] font-display text-[clamp(3.5rem,7vw,6rem)] leading-none tracking-[-0.03em] focus:outline-none [@media(max-height:500px)]:text-[2.75rem]"
            >
              Renungan Harian
            </h1>
            <p
              class="mt-5 max-w-lg text-sm leading-7 text-muted [@media(max-height:500px)]:hidden"
            >
              Luangkan waktu untuk merenungkan firman Tuhan dalam kehidupan
              sehari-hari.
            </p>
            <div
              v-if="devotions.length"
              class="mt-6 flex items-center justify-between gap-5 border-b border-purple/15 pb-5 [@media(max-height:500px)]:mt-3 [@media(max-height:500px)]:pb-2"
            >
              <p class="text-xs text-muted">
                {{
                  archiveMode
                    ? `${devotions.length} renungan dalam arsip`
                    : 'Bacaan untuk hari-hari Anda'
                }}
              </p>
              <button
                :id="
                  archiveMode ? 'show-devotion-cards' : 'show-devotion-archive'
                "
                class="min-h-11 shrink-0 px-1 text-sm underline underline-offset-4"
                @click="changeMode(archiveMode ? 'cards' : 'archive')"
              >
                {{ archiveMode ? 'Kembali ke Kartu' : 'Tampilkan Semua' }}
              </button>
            </div>
            <ol
              v-if="archiveMode"
              data-devotion-archive
              class="divide-y divide-purple/15"
            >
              <li v-for="devotion in devotions" :key="devotion.slug">
                <a
                  :id="`archive-devotion-${devotion.slug}`"
                  :href="devotionUrl(devotion.slug)"
                  class="group grid gap-3 py-7 text-left sm:grid-cols-[10rem_1fr] sm:gap-8 sm:py-9"
                  @click="$emit('open', devotion, $event)"
                >
                  <time
                    :datetime="devotion.date"
                    class="pt-1 text-xs leading-6 text-muted"
                    >{{ devotion.dateLabel }}</time
                  >
                  <div class="max-w-[70ch]">
                    <h2
                      class="font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.025em] decoration-purple/35 underline-offset-4 group-hover:underline group-focus-visible:underline"
                    >
                      {{ devotion.title }}
                    </h2>
                    <p class="mt-3 line-clamp-3 text-sm leading-7 text-muted">
                      {{ devotion.preview }}
                    </p>
                  </div>
                </a>
              </li>
            </ol>
            <template v-else>
              <p
                v-if="group === 0 && devotions.length"
                class="mt-10 text-xs text-muted [@media(max-height:500px)]:mt-4"
              >
                Renungan Terbaru
              </p>
              <div
                data-devotion-grid
                class="grid gap-9 py-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 [@media(max-height:500px)]:py-4"
              >
                <DevotionCard
                  v-for="(devotion, index) in visibleDevotions"
                  :key="devotion.slug"
                  :devotion="devotion"
                  :index="index"
                  @open="(item, event) => $emit('open', item, event)"
                />
              </div>
              <p v-if="!devotions.length" class="py-10 text-muted">
                Renungan Harian akan tersedia di sini.
              </p>
              <nav
                v-if="devotions.length"
                aria-label="Kelompok renungan"
                class="mt-6 flex flex-wrap items-center justify-between gap-5 border-t border-purple/15 pt-6 text-sm"
              >
                <button
                  class="min-h-11 px-1 underline underline-offset-4 disabled:cursor-default disabled:text-muted/65 disabled:no-underline"
                  :disabled="group === 0"
                  @click="changeGroup(group - 1)"
                >
                  Sebelumnya
                </button>
                <span aria-live="polite" class="text-xs tabular-nums text-muted"
                  >{{ group * groupSize + 1 }}–{{
                    Math.min((group + 1) * groupSize, devotions.length)
                  }}
                  dari {{ devotions.length }} renungan</span
                >
                <button
                  class="min-h-11 px-1 underline underline-offset-4 disabled:cursor-default disabled:text-muted/65 disabled:no-underline"
                  :disabled="group === lastGroup"
                  @click="changeGroup(group + 1)"
                >
                  Berikutnya
                </button>
              </nav>
            </template>
          </div>
        </section>
      </main>
    </div>
  </div>
  <dialog
    ref="readerDialog"
    class="devotion-dialog fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl flex-col overflow-hidden rounded-xl bg-warm-white p-0 text-purple shadow-[0_24px_80px_-16px_#1e1b3a66] open:flex sm:max-h-[calc(100dvh-4rem)] sm:w-[calc(100%-4rem)]"
    aria-labelledby="devotion-title"
    @cancel.prevent="$emit('back')"
    @click="closeFromBackdrop"
  >
    <template v-if="devotional">
      <div class="shrink-0 border-b border-purple/15 px-6 py-3 sm:px-10">
        <button
          class="flex min-h-11 items-center gap-3 text-sm underline-offset-4 hover:underline"
          @click="$emit('back')"
        >
          <svg class="size-5" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M20 12H4m6-6-6 6 6 6" />
          </svg>
          Kembali ke Renungan
        </button>
      </div>
      <article
        :key="devotional.slug"
        ref="reader"
        data-devotion-reader
        tabindex="-1"
        class="min-h-0 overflow-y-auto overscroll-contain px-6 pt-7 pb-10 text-left focus:outline-none sm:px-10 sm:pt-9 sm:pb-14"
      >
        <p class="mb-8 text-right text-xs leading-6 text-muted sm:text-sm">
          {{ devotional.heading }}
        </p>
        <h1
          id="devotion-title"
          class="mb-8 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,4.8rem)] leading-[1.02] tracking-[-0.025em]"
        >
          {{ devotional.title }}
        </h1>
        <div class="max-w-[70ch] space-y-6 text-base sm:text-[17px]">
          <p
            v-for="(paragraph, index) in devotional.paragraphs"
            :key="index"
            class="whitespace-pre-line"
          >
            {{ paragraph }}
          </p>
        </div>
      </article>
    </template>
  </dialog>
</template>

<style scoped>
.devotion-dialog::backdrop {
  background: rgb(30 27 58 / 48%);
}

[data-devotion-reader] {
  scrollbar-color: var(--color-muted) var(--color-warm-white);
}

[data-devotion-reader] p {
  line-height: 1.85;
}
</style>
