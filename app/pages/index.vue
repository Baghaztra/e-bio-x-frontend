<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
    <!-- Hero Section - Full Screen -->
    <section class="min-h-screen bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 relative overflow-hidden">
      <!-- Floating background elements -->
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div class="absolute bottom-32 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <!-- Header -->
      <header class="relative z-10 flex justify-between items-center p-6">
        <div class="text-3xl font-bold text-white flex items-center gap-2">
          <Icon name="heroicons:academic-cap" class="w-8 h-8" />
          E-Bio X
        </div>
        <ToggleDark />
      </header>

      <!-- Hero Content -->
      <div class="relative z-10 flex items-center justify-center min-h-[calc(100vh-5rem)] px-6">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-8 hover:bg-white/30 transition-all cursor-pointer">
            <Icon name="heroicons:sparkles" class="w-4 h-4" />
            Platform Pembelajaran Terdepan
          </div>

          <!-- Main Title -->
          <h1 class="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            E-Bio X
          </h1>
          <p class="text-xl md:text-2xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Platform pembelajaran biologi interaktif dengan teknologi AI untuk siswa dan guru masa depan
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <NuxtLink
              to="/login"
              class="group inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <Icon name="heroicons:rocket-launch" class="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Mulai Sekarang
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <Icon name="heroicons:chevron-down" class="w-8 h-8" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-6 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/50 px-4 py-2 rounded-full text-green-700 dark:text-green-300 font-medium mb-6">
            <Icon name="heroicons:star" class="w-4 h-4" />
            Fitur Unggulan
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mengapa Pilih E-Bio X?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Teknologi terdepan untuk pembelajaran yang efektif dan menyenangkan
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1">
            <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Icon name="heroicons:book-open" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Materi Pembelajaran
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Akses materi pembelajaran biologi lengkap dari guru berpengalaman
            </p>
            <!-- <div class="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold group-hover:gap-4 transition-all">
              <span>Pelajari Lebih</span>
              <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div> -->
          </div>

          <!-- Feature 2 -->
          <div class="group bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:-rotate-1">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
              <Icon name="heroicons:puzzle-piece" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Kuis Interaktif
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Kuis dari guru untuk mengukur tingkat pemahaman 
            </p>
            <!-- <div class="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-4 transition-all">
              <span>Coba Sekarang</span>
              <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div> -->
          </div>

          <!-- Feature 3 -->
          <div class="group bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Icon name="heroicons:chart-bar" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Analisis Performa
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Menggunakan K-Means Clustering dan Decision Tree untuk evaluasi kuis dan analisis siswa
            </p>
            <!-- <div class="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold group-hover:gap-4 transition-all">
              <span>Lihat Analytics</span>
              <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div> -->
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Features Grid -->
    <!-- <section class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="group p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Icon name="heroicons:beaker" class="w-8 h-8 text-green-600 dark:text-green-400 mb-4 group-hover:rotate-12 transition-transform" />
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">Lab Virtual</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Experimen virtual yang aman</p>
          </div>
          
          <div class="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Icon name="heroicons:users" class="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4 group-hover:rotate-12 transition-transform" />
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">Kolaborasi</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Belajar bersama teman</p>
          </div>
          
          <div class="group p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Icon name="heroicons:trophy" class="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4 group-hover:rotate-12 transition-transform" />
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">Gamifikasi</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Point dan achievements</p>
          </div>
          
          <div class="group p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Icon name="heroicons:device-phone-mobile" class="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4 group-hover:rotate-12 transition-transform" />
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">Mobile App</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Belajar kapanpun dimana saja</p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Footer -->
    <FooterComponet />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>
