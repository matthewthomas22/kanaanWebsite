<script setup>
import SiteHeader from './components/SiteHeader.vue';
import SectionRail from './components/SectionRail.vue';
import ChurchSection from './components/ChurchSection.vue';
import KidsSection from './components/KidsSection.vue';
import YouthSection from './components/YouthSection.vue';
import EventsSection from './components/EventsSection.vue';
import { useActiveSection } from './composables/useActiveSection.js';

const currentSection = useActiveSection();
</script>

<template>
  <a class="skip-link" href="#main">Lewati navigasi</a>
  <SiteHeader :current-section="currentSection" />
  <main id="main" tabindex="-1">
    <ChurchSection />
    <KidsSection />
    <YouthSection />
    <EventsSection />
  </main>
  <SectionRail :current-section="currentSection" />
</template>