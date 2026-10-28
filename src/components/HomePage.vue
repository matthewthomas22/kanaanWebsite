<script setup>
import { ref } from 'vue';
import SiteHeader from './SiteHeader.vue';
import SectionRail from './SectionRail.vue';
import ChurchSection from './ChurchSection.vue';
import ServicesSection from './ServicesSection.vue';
import DevotionsSection from './DevotionsSection.vue';
import KidsSection from './KidsSection.vue';
import YouthSection from './YouthSection.vue';
import EventsSection from './EventsSection.vue';
import { useActiveSection } from '../composables/useActiveSection.js';
import { useSmoothScroll } from '../composables/useSmoothScroll.js';

defineEmits(['open-devotion', 'open-collection']);

const wrapper = ref(null);
const content = ref(null);
const { currentSection, updateCurrent } = useActiveSection();
useSmoothScroll(wrapper, content, updateCurrent);
</script>

<template>
  <SiteHeader
    :current-section="currentSection"
    @open-collection="$emit('open-collection', $event)"
  />
  <div id="smooth-wrapper" ref="wrapper">
    <div id="smooth-content" ref="content" class="pt-[var(--header)]">
      <main id="main" tabindex="-1" class="focus:outline-none">
        <ChurchSection />
        <ServicesSection />
        <DevotionsSection
          @open-devotion="
            (devotion, event) => $emit('open-devotion', devotion, event)
          "
          @open-collection="$emit('open-collection', $event)"
        />
        <KidsSection />
        <YouthSection />
        <EventsSection />
      </main>
    </div>
  </div>
  <SectionRail :current-section="currentSection" />
</template>
