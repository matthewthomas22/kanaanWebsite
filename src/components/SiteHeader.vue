<script setup>
import { navigation } from '../data/navigation.js';

defineProps({ currentSection: { type: String, required: true } });
</script>

<template>
  <header class="site-header fixed inset-x-0 top-0 z-20 flex h-[var(--header)] flex-col items-start justify-center gap-2 bg-warm-white px-[var(--gutter)] md:flex-row md:items-center md:justify-between md:gap-6 md:pr-[calc(var(--rail)+var(--gutter))]">
    <a class="flex min-h-11 shrink-0 flex-col justify-center font-display text-[28px] leading-none font-semibold tracking-[-0.03em]" href="#kanaan" aria-label="GKIm Kanaan, beranda">GKIm Kanaan<span class="mt-1.5 font-sans text-xs font-normal tracking-normal">Gereja Kristen Immanuel</span></a>
    <nav class="flex w-full items-center justify-between gap-1 md:w-auto md:gap-6 lg:gap-8" aria-label="Navigasi utama">
      <a
        v-for="section in navigation"
        :key="section.id"
        class="relative flex min-h-11 min-w-11 items-center justify-center gap-2 text-xs after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-purple after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=location]:after:scale-x-100"
        :href="`#${section.id}`"
        :data-section="section.id"
        :aria-current="currentSection === section.id ? 'location' : undefined"
      >
        {{ section.headerLabel }}
        <svg class="size-3.5" v-if="section.id === 'acara'" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6h12v12"/></svg>
      </a>
    </nav>
  </header>
</template>
