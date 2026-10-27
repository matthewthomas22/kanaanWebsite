<script setup>
import { navigation } from '../data/navigation.js';

defineProps({ currentSection: { type: String, required: true } });
</script>

<template>
  <nav class="section-rail fixed top-1/2 right-0 z-20 hidden w-[var(--rail)] -translate-y-1/2 flex-col items-center gap-1 md:flex" aria-label="Pilih bagian halaman">
    <a
      v-for="section in navigation"
      :key="section.id"
      class="group relative grid size-11 place-items-center"
      :href="`#${section.id}`"
      :data-section="section.id"
      :aria-label="section.label"
      :aria-current="currentSection === section.id ? 'location' : undefined"
    ><span class="absolute right-12 bg-purple px-3 py-1.5 text-xs whitespace-nowrap text-warm-white opacity-0 invisible transition-opacity group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100">{{ section.label }}</span><span aria-hidden="true" class="size-1.5 rounded-full bg-muted group-aria-[current=location]:bg-purple group-aria-[current=location]:shadow-[0_0_0_5px_var(--color-warm-white),0_0_0_6px_var(--color-gold)]"></span></a>
  </nav>
</template>
