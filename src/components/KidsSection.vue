<script setup>
import kidsPhoto from '../../assets/images/kanaan-kids.png';
</script>

<template>
  <section
    class="chapter flex flex-col gap-10 px-[var(--gutter)] py-12 text-purple sm:py-16 lg:px-[7%]"
    id="kids"
    aria-labelledby="kids-title"
  >
    <div class="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
      <div class="min-w-0">
        <h2 id="kids-title" class="font-display text-[clamp(4rem,7.5vw,6rem)] leading-[0.95] font-medium tracking-[-0.035em]">
          Kanaan<br><em class="font-normal text-mid">Kids.</em>
        </h2>
        <p class="mt-6 text-sm leading-relaxed">Komisi anak GKIm Kanaan</p>
        <p class="my-7 font-display text-[clamp(1.75rem,3vw,2rem)] leading-tight">
          Mengenal kasih Tuhan,<br>bertumbuh bersama.
        </p>
        <a
          class="group inline-flex min-h-11 w-fit items-center gap-5 border-b border-current py-2.5 text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-gold"
          href="#kyc"
        >
          Berikutnya: KYC
          <svg class="size-[17px] motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-y-1" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 4v16m-6-6 6 6 6-6"/></svg>
        </a>
      </div>
      <figure class="mx-auto w-full max-w-[23rem] text-center sm:max-w-[25rem] lg:max-w-[447px]">
        <img class="block h-auto w-full object-contain" :src="kidsPhoto" alt="Tim pengajar Kanaan Kids bersama gitar dan boneka tangan" width="447" height="559" loading="lazy">
        <figcaption class="mt-3 text-xs leading-relaxed text-muted">Bersama tim pengajar Kanaan Kids</figcaption>
      </figure>
    </div>
    <div class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs leading-relaxed">
      <span>GKIm Kanaan</span><span>Kecil langkahnya. Besar kasih-Nya.</span>
    </div>
  </section>
</template>
