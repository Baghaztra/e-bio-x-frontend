<template>
  <div class="container mx-auto px-4 py-6 max-w-2xl">
    <h2 class="text-2xl font-semibold mb-4">Buat Kuis Baru</h2>
    <form @submit.prevent="submitQuiz" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Judul Kuis</label>
        <input
          v-model="quiz.title"
          type="text"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Deskripsi</label>
        <textarea
          v-model="quiz.description"
          class="w-full border rounded px-3 py-2"
          rows="4"
        ></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Waktu Selesai</label>
        <input
          v-model="quiz.deadline"
          type="datetime-local"
          class="w-full border rounded px-3 py-2"
        />
      </div>
      <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        Simpan Kuis
      </button>
    </form>
  </div>
</template>

<script setup>
const quizData = ref({
  title: '',
  description: '',
  questions: []
})

const addQuestion = () => {
  quizData.value.questions.push({
    text: '',
    type: 'multiple',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ],
    answer: ''
  })
}

const removeQuestion = (index) => {
  quizData.value.questions.splice(index, 1)
}

const addOption = (questionIndex) => {
  quizData.value.questions[questionIndex].options.push({
    text: '',
    isCorrect: false
  })
}

const removeOption = (questionIndex, optionIndex) => {
  quizData.value.questions[questionIndex].options.splice(optionIndex, 1)
}

const handleQuestionTypeChange = (index) => {
  const question = quizData.value.questions[index]
  if (question.type === 'multiple') {
    question.options = [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
    question.answer = ''
  } else {
    question.options = []
    question.answer = ''
  }
}

const handleSubmit = () => {
  // TODO: Implement quiz submission when backend is ready
  console.log('Quiz data:', quizData.value)
}
</script> 