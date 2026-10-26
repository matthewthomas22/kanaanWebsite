<script setup>
import { navigation } from '../data/navigation.js';

defineProps({ currentSection: { type: String, required: true } });
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="#kanaan" aria-label="GKIm Kanaan, beranda">GKIm Kanaan<span>Gereja Kristen Immanuel</span></a>
    <nav aria-label="Navigasi utama">
      <a
        v-for="section in navigation"
        :key="section.id"
        :href="`#${section.id}`"
        :data-section="section.id"
        :aria-current="currentSection === section.id ? 'location' : undefined"
      >
        {{ section.headerLabel }}
        <svg v-if="section.id === 'acara'" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6h12v12"/></svg>
      </a>
    </nav>
  </header>
</template>
