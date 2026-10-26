<script setup>
import { navigation } from '../data/navigation.js';

const communities = navigation.slice(1);
</script>

<template>
  <section class="chapter church" id="kanaan" aria-labelledby="church-title">
    <div class="church-surface">
      <div class="church-center">
        <svg class="cross" aria-hidden="true" viewBox="0 0 40 60"><path d="M20 2v56M3 20h34"/></svg>
        <h1 id="church-title">GKIm Kanaan</h1>
        <p class="church-name">Gereja Kristen Immanuel</p>
        <a class="text-link church-action" href="#kids">Mengenal komunitas kami <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 4v16m-6-6 6 6 6-6"/></svg></a>
      </div>
      <div class="church-bottom">
        <p>Satu gereja.<br><span>Ruang untuk setiap generasi.</span></p>
        <div class="chapter-preview" aria-label="Jelajahi komunitas">
          <a v-for="section in communities" :key="section.id" :href="`#${section.id}`">{{ section.label }} <span>{{ section.description }}</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>
        </div>
      </div>
    </div>
  </section>
</template>
