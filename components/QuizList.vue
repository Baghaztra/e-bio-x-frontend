<template>
    <div class="p-6 bg-white rounded-sm shadow-lg border border-green-200">
      <h2 class="text-xl font-semibold text-green-700 flex items-center gap-2">
        <Icon name="hugeicons:quiz-04" class="text-green-500" /> Kuis
      </h2>
  
      <div class="my-3">

        <div v-if="loading" class="text-gray-500">Memuat data kuis...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
          <div v-if="quizzes.length === 0" class="text-gray-500">Belum ada kuis untuk kelas ini.</div>
    
          <div v-else class="space-y-4">
            <div
              v-for="quiz in quizzes"
              :key="quiz.quiz_id"
              class="border rounded p-4 shadow-sm"
            >
              <h3 class="text-xl font-semibold">{{ quiz.title }}</h3>
              <p class="text-sm text-gray-600">Tanggal dibuat: {{ formatDate(quiz.created_at) }}</p>
              <p class="text-sm">Jumlah pertanyaan: {{ quiz.questions }}</p>
              <p class="text-sm" :class="quiz.is_closed ? 'text-red-500' : 'text-green-600'">
                Status: {{ quiz.is_closed ? 'Ditutup' : 'Terbuka' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import Swal from 'sweetalert2'
  
  const props = defineProps({
    courseId: {
      type: Number,
      required: true
    }
  })
  
  const quizzes = ref([])
  const loading = ref(true)
  const error = ref(null)
  
  const fetchQuizzes = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch(`${useRuntimeConfig().public.backend}/api/course/quiz/${props.courseId}`)
      quizzes.value = res.quizzes
    } catch (err) {
      console.error(err)
      error.value = 'Gagal memuat data kuis.'
      Swal.fire('Error', 'Gagal memuat data kuis.', 'error')
    } finally {
      loading.value = false
    }
  }
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleString('id-ID')
  }
  
  onMounted(() => {
    fetchQuizzes()
  })
  
  watch(() => props.courseId, () => {
    fetchQuizzes()
  })
  </script>
  