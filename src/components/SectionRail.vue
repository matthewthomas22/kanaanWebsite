<script setup>
import { navigation } from '../data/navigation.js';

defineProps({ currentSection: { type: String, required: true } });
</script>

<template>
  <nav class="section-rail" aria-label="Pilih bagian halaman">
    <a
      v-for="section in navigation"
      :key="section.id"
      :href="`#${section.id}`"
      :data-section="section.id"
      :aria-label="section.label"
      :aria-current="currentSection === section.id ? 'location' : undefined"
    ><span>{{ section.label }}</span></a>
  </nav>
</template>
