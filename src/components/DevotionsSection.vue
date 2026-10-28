<script setup>
import DevotionCard from './DevotionCard.vue';
import { devotions, devotionUrl } from '../data/devotions.js';

defineEmits(['open-collection']);
const latestDevotions = [...devotions]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);
</script>

<template>
  <section
    id="renungan"
    class="chapter grid content-center gap-12 bg-ivory/45 px-[var(--gutter)] py-20 lg:gap-16 lg:py-24 [@media(max-height:500px)]:gap-4 [@media(max-height:500px)]:py-5"
    aria-labelledby="devotions-title"
  >
    <div class="flex flex-wrap items-end justify-between gap-6">
      <h2
        id="devotions-title"
        class="max-w-[12ch] text-[clamp(3.5rem,7vw,6rem)] [@media(max-height:500px)]:max-w-none [@media(max-height:500px)]:text-[2.75rem]"
      >
        Renungan Harian
      </h2>
      <a
        :href="devotionUrl()"
        class="inline-flex min-h-11 items-center gap-5 border-b border-purple/40 text-xs"
        @click="$emit('open-collection', $event)"
      >
        Lihat Semua Renungan
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 12h16m-6-6 6 6-6 6" />
        </svg>
      </a>
    </div>
    <div class="grid gap-9 px-2 py-4 md:grid-cols-3 md:gap-6 lg:gap-9">
      <DevotionCard
        v-for="(devotion, index) in latestDevotions"
        :key="devotion.slug"
        :devotion="devotion"
        :index="index"
        compact
        :href="devotionUrl()"
        @open="(entry, event) => $emit('open-collection', event)"
      />
    </div>
  </section>
</template>
