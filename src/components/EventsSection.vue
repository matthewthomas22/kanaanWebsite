<script setup>
import EventCard from './EventCard.vue'
import { eventPlaceholders } from '../data/events.js'
</script>

<template>
  <section
    class="chapter flex flex-col justify-center gap-8 px-(--gutter) py-12 text-purple sm:gap-10 lg:px-[7%] lg:py-16"
    id="acara"
    aria-labelledby="events-title"
  >
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <h2 id="events-title" class="font-display text-[clamp(3rem,5vw,4.375rem)] font-medium leading-[0.95] tracking-[-0.035em] text-balance">
        Kehidupan<br><em class="font-normal">bersama.</em>
      </h2>
      <p class="text-xs leading-relaxed">Acara &amp; kegiatan <br class="hidden sm:block">GKIm Kanaan</p>
    </div>
    <div class="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Templat acara, detail belum tersedia">
      <EventCard v-for="event in eventPlaceholders" :key="event.id" />
    </div>
    <footer class="mt-auto flex flex-col items-start justify-between gap-3 border-t border-purple/15 pt-5 text-xs leading-relaxed sm:flex-row sm:items-center sm:gap-6">
      <span>GKIm Kanaan · Gereja Kristen Immanuel</span>
      <a class="group inline-flex min-h-11 shrink-0 items-center gap-5 py-2 focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-gold" href="#kanaan">
        Kembali ke atas
        <svg class="size-[17px] motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-1" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 20V4m-6 6 6-6 6 6" />
        </svg>
      </a>
    </footer>
  </section>
</template>
