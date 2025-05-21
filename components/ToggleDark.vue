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
  <button @click="toggleDark" class="border border-gray-800 text-white p-2 rounded flex items-center justify-center">
    <Icon
      :name="isDark ? 'lucide-sun' : 'lucide-moon'"
      class="transition-all duration-300 text-xl"
    />
  </button>
</template>
