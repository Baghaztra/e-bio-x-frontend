<template>
  <div class="flex h-screen w-full items-center justify-center">
    <!-- <h2 class="text-[7rem] font-semibold text-white fancy-glow">
      Ini Dashboard
    </h2> -->
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
  role: "admin",
});
</script>

<style scoped>
@keyframes glowColors {
  0% {
    text-shadow: 0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 30px #ff0080;
  }
  25% {
    text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
  }
  50% {
    text-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14;
  }
  75% {
    text-shadow: 0 0 10px #ffea00, 0 0 20px #ffea00, 0 0 30px #ffea00;
  }
  100% {
    text-shadow: 0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 30px #ff0080;
  }
}

.fancy-glow {
  animation: glowColors 3s infinite alternate;
}
</style>
