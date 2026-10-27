<template>
  <section
    class="chapter ml-[var(--gutter)] flex flex-col gap-12 rounded-sm bg-mid px-6 pt-12 pb-6 text-ivory sm:px-10 sm:pt-16 sm:pb-8 lg:gap-16 lg:px-[6%] lg:pt-18"
    id="kyc"
    aria-labelledby="kyc-title"
  >
    <div class="grid flex-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
      <div class="min-w-0">
        <h2
          id="kyc-title"
          class="font-display text-[clamp(5rem,10vw,6rem)] leading-[0.95] font-medium tracking-[-0.035em]"
        >
          KYC
          <span
            class="mt-5 block font-sans text-xs leading-relaxed font-normal tracking-normal lg:mt-7"
            >Komisi pemuda GKIm Kanaan</span
          >
        </h2>
      </div>
      <div class="min-w-0">
        <p
          class="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.025em]"
        >
          Iman yang hidup.<br />Perjalanan yang<br /><em
            class="font-normal text-gold"
            >kita bagi.</em
          >
        </p>
        <a
          class="group mt-6 inline-flex min-h-11 max-w-full items-center gap-5 border-b border-current py-3 text-xs leading-normal transition-colors hover:text-gold lg:mt-9"
          href="#acara"
        >
          Lihat ruang acara
          <svg
            class="size-[17px] shrink-0 fill-none stroke-current stroke-[1.4] transition-transform duration-300 motion-safe:group-hover:translate-y-1"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              class="[stroke-linecap:round] [stroke-linejoin:round]"
              d="M12 4v16m-6-6 6 6 6-6"
            />
          </svg>
        </a>
      </div>
    </div>
    <div
      class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-ivory/20 pt-5 text-xs leading-relaxed"
    >
      <span>GKIm Kanaan</span><span>Bertumbuh. Bersama.</span>
    </div>
  </section>
</template>
