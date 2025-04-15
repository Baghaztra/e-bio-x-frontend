<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />

    <!-- Main Content -->
    <main class="flex-1 px-4 py-6 max-w-6xl mx-auto w-full">
      <slot />
    </main>

    <!-- Footer -->
    <FooterComponet />
  </div>
</template>
