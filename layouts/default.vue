<template>
  <div>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <NuxtLink class="navbar-brand" to="/">E-Bio-X</NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/login">Login</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container py-4">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-light py-4 mt-auto">
      <div class="container text-center">
        <p class="mb-0">&copy; 2024 E-Bio-X. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Layout level scripts here
</script>

<style scoped>
/* Custom styles here */
</style> 