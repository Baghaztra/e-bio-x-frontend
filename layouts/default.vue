<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />

    <!-- Main Content -->
    <main class="flex-1 px-4 py-6 max-w-6xl mx-auto w-full">
      <slot />
    </main>

    <!-- Footer -->
    <FooterComponet />
  </div>
</template>

<style scoped>
html, body {
  min-height: 100vh;
}
</style>
