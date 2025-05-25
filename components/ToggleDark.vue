<script setup>
const isDark = ref(false)

onMounted(() => {
  if (localStorage.getItem('theme') === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <button
    @click="toggleDark"
    class="p-2 rounded-full flex items-center justify-center transition-all duration-300
           bg-white/20 dark:bg-white/10 backdrop-blur-sm
           border border-white/30
           hover:bg-white/30 dark:hover:bg-white/20
           text-white shadow-md"
  >
    <Icon
      :name="isDark ? 'lucide-sun' : 'lucide-moon'"
      class="text-2xl transition-all duration-300"
    />
  </button>
</template>
