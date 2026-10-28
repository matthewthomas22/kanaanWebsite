<script setup>
import { ref } from 'vue';
import { devotionUrl } from '../data/devotions.js';
import { useFloatingCard } from '../composables/useFloatingCard.js';
const props = defineProps({
  devotion: { type: Object, required: true },
  index: { type: Number, default: 0 },
  compact: Boolean,
});
defineEmits(['open']);
const card = ref(null);
const { onPointerEnter, onPointerLeave, onFocusIn, onFocusOut } =
  useFloatingCard(card, { index: props.index, compact: props.compact });
</script>

<template>
  <a
    ref="card"
    :id="`devotion-${devotion.slug}`"
    :href="devotionUrl(devotion.slug)"
    data-devotion-card
    :data-devotion-slug="devotion.slug"
    class="devotion-card group flex h-full flex-col rounded-xl bg-warm-white p-7 text-left text-purple shadow-[0_18px_42px_-20px_#1e1b3a50] sm:p-8"
    :class="compact ? 'min-h-64' : 'min-h-80'"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @click="$emit('open', devotion, $event)"
  >
    <time :datetime="devotion.date" class="text-xs text-muted">{{
      devotion.dateLabel
    }}</time>
    <h2
      class="mt-6 mb-4 font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.025em]"
    >
      {{ devotion.title }}
    </h2>
    <p class="line-clamp-3 text-sm leading-7 text-muted">
      {{ devotion.preview }}
    </p>
    <span class="mt-auto flex items-center gap-3 pt-7 text-xs"
      >Baca renungan
      <svg aria-hidden="true" viewBox="0 0 24 24" class="size-4">
        <path d="M4 12h16m-6-6 6 6-6 6" /></svg
    ></span>
  </a>
</template>
