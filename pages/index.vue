<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-a text-white py-5 rounded-2">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="">Selamat Datang di E-Bio-X</h1>
            <p class="lead">Platform pembelajaran biologi interaktif untuk siswa dan guru</p>
            <NuxtLink to="/login" class="btn bg-c btn-lg">Mulai Belajar</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Fitur Section -->
    <div class="container py-5">
      <h2 class="text-center mb-5">Fitur Unggulan</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Kuis Interaktif</h5>
              <p class="card-text">
                Latihan soal dan kuis yang interaktif untuk meningkatkan pemahaman
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Materi Lengkap</h5>
              <p class="card-text">Akses materi pembelajaran biologi yang komprehensif</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Kelas Virtual</h5>
              <p class="card-text">
                Bergabung dengan kelas virtual untuk pembelajaran yang lebih efektif
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>
