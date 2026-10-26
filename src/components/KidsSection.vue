<script setup>
import kidsPhoto from '../../assets/images/kanaan-kids.png';
</script>

<template>
  <section class="chapter kids" id="kids" aria-labelledby="kids-title">
    <div class="commission-copy">
      <h2 id="kids-title">Kanaan<br><em>Kids.</em></h2>
      <p class="commission-name">Komisi anak GKIm Kanaan</p>
      <p class="description">Mengenal kasih Tuhan,<br>bertumbuh bersama.</p>
      <a class="text-link" href="#kyc">Berikutnya: KYC <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 4v16m-6-6 6 6 6-6"/></svg></a>
    </div>
    <figure class="kids-photo">
      <img :src="kidsPhoto" alt="Tim pengajar Kanaan Kids bersama gitar dan boneka tangan" width="447" height="559" loading="lazy">
      <figcaption>Bersama tim pengajar Kanaan Kids</figcaption>
    </figure>
    <div class="section-footer"><span>GKIm Kanaan</span><span>Kecil langkahnya. Besar kasih-Nya.</span></div>
  </section>
</template>
