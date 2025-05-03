<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-green-700 mt-5 text-white py-16 rounded-2xl shadow-lg">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2">
            <h1 class="text-4xl font-bold mb-4"><span class="text-yellow-300">E-Bio-X</span></h1>
            <p class="text-lg mb-6">Platform pembelajaran biologi interaktif untuk siswa dan guru</p>
            <NuxtLink
              to="/login"
              class="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded shadow"
            >
              Get Started!
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Fitur Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Fitur Unggulan</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h5 class="text-xl font-semibold mb-2">Materi Pembelajaran</h5>
            <p class="text-gray-600">
              Akses materi pembelajaran biologi dari guru
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h5 class="text-xl font-semibold mb-2">Kuis Interaktif</h5>
            <p class="text-gray-600">
              Latihan soal dan kuis yang interaktif untuk meningkatkan pemahaman
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h5 class="text-xl font-semibold mb-2">Analisis Performa</h5>
            <p class="text-gray-600">
              Menggunakan K-Means Clustering dan Decision Tree untuk evaluasi kuis
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>
