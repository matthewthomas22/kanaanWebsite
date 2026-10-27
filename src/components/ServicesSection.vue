<template>
  <section
    id="jadwal"
    class="chapter grid content-center gap-12 px-[var(--gutter)] py-16 lg:grid-cols-[0.9fr_1.3fr] lg:items-center lg:gap-20 lg:py-24"
    aria-labelledby="services-title"
  >
    <div>
      <h2 id="services-title" class="max-w-[9ch] text-[clamp(3.5rem,7vw,6rem)]">
        Jadwal Kebaktian
      </h2>
      <p class="mt-6 text-sm text-muted">Setiap Minggu</p>
    </div>

    <div class="border-t border-purple/20">
      <article class="border-b border-purple/20 py-8 sm:py-10">
        <h3
          class="font-display text-[clamp(2rem,3vw,2.5rem)] leading-tight tracking-[-0.025em]"
        >
          Kebaktian Umum
        </h3>
        <p class="mt-4 text-2xl font-medium tabular-nums sm:text-3xl">
          <time datetime="08:00">08.00</time
          ><span class="mx-2 text-muted">–</span
          ><span aria-label="sekitar pukul 09.30"
            >±<time datetime="09:30">09.30</time></span
          >
        </p>
        <p class="mt-3 text-sm text-muted">Biasanya selesai pukul 09.30.</p>
      </article>

      <article class="border-b border-purple/20 py-8 sm:py-10">
        <h3
          class="font-display text-[clamp(2rem,3vw,2.5rem)] leading-tight tracking-[-0.025em]"
        >
          Kebaktian Kontemporer
        </h3>
        <p class="mt-4 text-2xl font-medium tabular-nums sm:text-3xl">
          <time datetime="10:00">10.00</time
          ><span class="mx-2 text-muted">–</span
          ><span class="text-lg font-normal sm:text-xl">selesai</span>
        </p>
        <p class="mt-3 max-w-[40ch] text-sm text-muted">
          Dengan lagu, musik, dan tata ibadah kontemporer.
        </p>
      </article>
    </div>
  </section>
</template>
