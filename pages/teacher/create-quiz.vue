<template>
  <div class="container py-4">
    <h2 class="mb-4">Buat Kuis Baru</h2>
    
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <!-- Informasi Dasar Kuis -->
          <div class="mb-4">
            <h4>Informasi Kuis</h4>
            <div class="mb-3">
              <label class="form-label">Judul Kuis</label>
              <input v-model="quizData.title" type="text" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Deskripsi</label>
              <textarea v-model="quizData.description" class="form-control" rows="3"></textarea>
            </div>
          </div>

          <!-- Form Generator untuk Pertanyaan -->
          <div class="mb-4">
            <h4>Pertanyaan</h4>
            <div v-for="(question, index) in quizData.questions" :key="index" class="card mb-3">
              <div class="card-body">
                <div class="mb-3">
                  <label class="form-label">Pertanyaan {{ index + 1 }}</label>
                  <input v-model="question.text" type="text" class="form-control" required>
                </div>
                
                <div class="mb-3">
                  <label class="form-label">Tipe Jawaban</label>
                  <select v-model="question.type" class="form-select" @change="handleQuestionTypeChange(index)">
                    <option value="multiple">Pilihan Ganda</option>
                    <option value="text">Teks Bebas</option>
                  </select>
                </div>

                <!-- Opsi untuk Pilihan Ganda -->
                <div v-if="question.type === 'multiple'" class="mb-3">
                  <label class="form-label">Pilihan Jawaban</label>
                  <div v-for="(option, optIndex) in question.options" :key="optIndex" class="input-group mb-2">
                    <input v-model="option.text" type="text" class="form-control" placeholder="Opsi jawaban">
                    <div class="input-group-text">
                      <input v-model="option.isCorrect" type="radio" :name="'correct'+index" class="form-check-input mt-0">
                    </div>
                    <button @click="removeOption(index, optIndex)" type="button" class="btn btn-outline-danger">Hapus</button>
                  </div>
                  <button @click="addOption(index)" type="button" class="btn btn-outline-primary btn-sm">
                    + Tambah Opsi
                  </button>
                </div>

                <!-- Jawaban untuk Tipe Teks -->
                <div v-if="question.type === 'text'" class="mb-3">
                  <label class="form-label">Kunci Jawaban</label>
                  <input v-model="question.answer" type="text" class="form-control">
                </div>

                <button @click="removeQuestion(index)" type="button" class="btn btn-danger btn-sm">
                  Hapus Pertanyaan
                </button>
              </div>
            </div>

            <button @click="addQuestion" type="button" class="btn btn-primary mb-3">
              + Tambah Pertanyaan
            </button>
          </div>

          <button type="submit" class="btn btn-success">Simpan Kuis</button>
        </form>
      </div>
    </div>
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