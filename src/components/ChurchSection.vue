<script setup>
import { navigation } from '../data/navigation.js';

const communities = navigation.filter((section) => section.description);
const imageFiles = import.meta.glob('../../assets/images/worship-2026/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
});
const photos = [
  {
    name: 'congregation',
    alt: 'Jemaat GKIm Kanaan mengikuti kebaktian',
    position: '50% 48%',
  },
  {
    name: 'easter-choir',
    alt: 'Paduan suara melayani dalam kebaktian Paskah 2026',
    position: '50% 42%',
  },
  {
    name: 'easter-musicians',
    alt: 'Tim musik melayani dalam kebaktian Paskah 2026',
    position: '50% 50%',
  },
  {
    name: 'good-friday-team',
    alt: 'Tim penatalayanan Jumat Agung 2026 berfoto bersama',
    position: '50% 54%',
  },
].map((photo) => ({
  ...photo,
  src: imageFiles[`../../assets/images/worship-2026/${photo.name}-1200.jpg`],
  srcset: `${imageFiles[`../../assets/images/worship-2026/${photo.name}-600.jpg`]} 600w, ${imageFiles[`../../assets/images/worship-2026/${photo.name}-1200.jpg`]} 1200w`,
}));
</script>

<template>
  <section
    class="chapter flex pb-4 pl-[var(--gutter)] pr-[var(--gutter)] md:pr-0 md:pb-5"
    id="kanaan"
    aria-labelledby="church-title"
  >
    <div
      class="relative isolate flex min-h-[calc(100svh-var(--header)-16px)] w-full min-w-0 flex-col justify-between overflow-hidden rounded-sm bg-purple px-5 pt-7 pb-6 text-ivory sm:px-8 md:min-h-[calc(100svh-var(--header)-20px)] lg:px-12 lg:pt-9 lg:pb-7 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:bg-[linear-gradient(180deg,rgba(30,27,58,.58),rgba(30,27,58,.90)_38%,rgba(30,27,58,.82)_60%,rgba(30,27,58,.97))]"
    >
      <div
        class="absolute inset-0 -z-20 grid grid-cols-2 grid-rows-2 gap-0.5 bg-purple sm:gap-[3px]"
        role="group"
        aria-label="Foto kebaktian Jumat Agung dan Paskah 2026"
      >
        <img
          class="block size-full min-h-0 min-w-0 object-cover"
          v-for="(photo, index) in photos"
          :key="photo.name"
          :src="photo.src"
          :srcset="photo.srcset"
          sizes="(max-width: 600px) 50vw, (min-width: 1600px) 50vw, 48vw"
          :alt="photo.alt"
          :style="{ objectPosition: photo.position }"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
          decoding="async"
        />
      </div>
      <div
        class="flex flex-1 flex-col items-center justify-center py-12 text-center md:pt-7 md:pb-12"
      >
        <h1
          id="church-title"
          class="max-w-full font-display text-[clamp(48px,11vw,96px)] leading-[0.95] font-semibold tracking-[-0.035em] text-warm-white [overflow-wrap:anywhere]"
        >
          GKIm Kanaan
        </h1>
        <p class="mt-4 font-display text-[clamp(21px,2.5vw,32px)] md:mt-2">
          Gereja Kristen Immanuel
        </p>
        <a
          class="group mt-6 inline-flex min-h-11 items-center gap-3 py-2.5 text-xs leading-normal text-gold md:mt-4 md:gap-5"
          href="#kids"
          >Mengenal komunitas kami
          <svg
            class="size-4.25 transition-transform duration-300 group-hover:translate-y-1"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M12 4v16m-6-6 6 6 6-6" /></svg
        ></a>
      </div>
      <p class="pb-4 text-xs text-ivory md:pb-[18px] md:text-right">
        Jumat Agung &amp; Paskah 2026
      </p>
      <div
        class="flex flex-col gap-6 border-t border-ivory/20 pt-5 lg:flex-row lg:items-end lg:justify-between lg:gap-9"
      >
        <p class="font-display text-[23px] leading-tight lg:flex-1">
          Satu gereja.<br /><span class="text-[19px]"
            >Ruang untuk setiap generasi.</span
          >
        </p>
        <div
          class="grid w-full grid-cols-1 gap-1 min-[380px]:grid-cols-3 min-[380px]:gap-4 lg:w-auto lg:flex-[1.4] lg:gap-9"
          aria-label="Jelajahi komunitas"
        >
          <a
            v-for="section in communities"
            :key="section.id"
            :href="`#${section.id}`"
            class="group relative flex min-h-11 flex-col justify-center pr-5 text-xs leading-relaxed"
            >{{ section.label }}
            <span class="mt-1 block text-xs text-ivory/85">{{
              section.description
            }}</span
            ><svg
              class="absolute top-3 right-0 size-[15px] text-gold transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" /></svg
          ></a>
        </div>
      </div>
    </div>
  </section>
</template>
