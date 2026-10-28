<script setup>
import { navigation } from '../data/navigation.js';
const headerNavigation = navigation.filter(
  (section) => section.header !== false,
);

defineProps({
  currentSection: { type: String, default: '' },
  devotionalPage: Boolean,
});
defineEmits(['open-collection']);
</script>

<template>
  <header
    class="site-header fixed inset-x-0 top-0 z-20 flex h-[var(--header)] flex-col items-start justify-center gap-2 bg-warm-white px-[var(--gutter)] md:flex-row md:items-center md:justify-between md:gap-6 md:pr-[calc(var(--rail)+var(--gutter))]"
  >
    <a
      class="flex min-h-11 shrink-0 flex-col justify-center font-display text-[28px] leading-none font-semibold tracking-[-0.03em]"
      :href="devotionalPage ? './#kanaan' : '#kanaan'"
      aria-label="GKIm Kanaan, beranda"
      >GKIm Kanaan<span
        class="mt-1.5 font-sans text-xs font-normal tracking-normal"
        >Gereja Kristen Immanuel</span
      ></a
    >
    <nav
      class="flex w-full items-center gap-4 overflow-x-auto text-center md:w-auto md:gap-4 lg:gap-6"
      aria-label="Navigasi utama"
    >
      <a
        v-for="section in headerNavigation"
        :key="section.id"
        class="relative flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap text-xs after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-purple after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=location]:after:scale-x-100"
        :href="`${devotionalPage ? './' : ''}#${section.id}`"
        :data-section="section.id"
        :aria-current="currentSection === section.id ? 'location' : undefined"
      >
        {{ section.headerLabel }}
        <svg
          class="hidden size-3.5 lg:block"
          v-if="section.id === 'acara'"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="M6 18 18 6M6 6h12v12" />
        </svg>
      </a>
      <a
        href="?page=renungan"
        class="relative flex min-h-11 shrink-0 items-center whitespace-nowrap text-xs underline-offset-8 hover:underline"
        :class="{ underline: devotionalPage || currentSection === 'renungan' }"
        :aria-current="
          devotionalPage
            ? 'page'
            : currentSection === 'renungan'
              ? 'location'
              : undefined
        "
        @click="$emit('open-collection', $event)"
        >Renungan Harian</a
      >
    </nav>
  </header>
</template>
