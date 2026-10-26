<script setup>
import EventCard from './EventCard.vue'
import { eventPlaceholders } from '../data/events.js'
</script>

<template>
  <section class="chapter events" id="acara" aria-labelledby="events-title">
    <div class="events-heading">
      <h2 id="events-title">Kehidupan<br><em>bersama.</em></h2>
      <p>Acara &amp; kegiatan <br>GKIm Kanaan</p>
    </div>
    <div class="event-templates" aria-label="Templat acara, detail belum tersedia">
      <EventCard v-for="event in eventPlaceholders" :key="event.id" />
    </div>
    <footer class="section-footer">
      <span>GKIm Kanaan · Gereja Kristen Immanuel</span>
      <a class="text-link" href="#kanaan">
        Kembali ke atas
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 20V4m-6 6 6-6 6 6" />
        </svg>
      </a>
    </footer>
  </section>
</template>
