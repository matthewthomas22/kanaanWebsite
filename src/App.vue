<script setup>
import { ref } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import SectionRail from './components/SectionRail.vue';
import ChurchSection from './components/ChurchSection.vue';
import KidsSection from './components/KidsSection.vue';
import YouthSection from './components/YouthSection.vue';
import EventsSection from './components/EventsSection.vue';
import { useActiveSection } from './composables/useActiveSection.js';
import { useSmoothScroll } from './composables/useSmoothScroll.js';

const wrapper = ref(null);
const content = ref(null);
const { currentSection, updateCurrent } = useActiveSection();
useSmoothScroll(wrapper, content, updateCurrent);
</script>

<template>
  <a class="skip-link fixed top-2.5 left-4 z-30 -translate-y-[160%] bg-warm-white px-5 py-3 focus:translate-y-0" href="#main">Lewati navigasi</a>
  <SiteHeader :current-section="currentSection" />
  <div id="smooth-wrapper" ref="wrapper">
    <div id="smooth-content" ref="content" class="pt-[var(--header)]">
      <main id="main" tabindex="-1" class="focus:outline-none">
        <ChurchSection />
        <KidsSection />
        <YouthSection />
        <EventsSection />
      </main>
    </div>
  </div>
  <SectionRail :current-section="currentSection" />
</template>
