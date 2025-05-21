<!-- DELETE? -->
<template>
  <div class="max-w-3xl mx-auto p-6">
    <div v-if="loading">
      <p class="text-center text-gray-500">Loading...</p>
    </div>

    <div v-else-if="quiz && quiz.questions && !quiz.questions.length">
      <p class="text-center text-gray-500">Tidak ada pertanyaan untuk ditampilkan.</p>
    </div>

    <div v-else>
      <h1 v-if="quiz.title" class="text-2xl font-bold mb-4 text-center">{{ quiz.title }}</h1>

      <div class="mb-4 flex justify-between items-center">
        <button @click="prevQuestion" :disabled="currentIndex === 0" class="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded">Sebelumnya</button>
        <button @click="nextQuestion" :disabled="currentIndex === quiz.questions.length - 1" class="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded">Berikutnya</button>
      </div>

      <div v-if="currentQuestion" class="mb-6">
        <p class="font-semibold mb-2">{{ currentIndex + 1 }}. {{ currentQuestion.question_text }}</p>
        <div class="space-y-2">
          <label v-for="option in currentQuestion.options" :key="option.option_id" class="flex items-center space-x-2">
            <input type="radio" :name="'question_' + currentQuestion.question_id" :value="option.option_id" v-model="answers[currentQuestion.question_id]" class="text-green-600 focus:ring-green-500" required />
            <span>{{ option.option_text }}</span>
          </label>
        </div>
      </div>

      <div class="mb-4">
        <button @click="openMap" class="px-3 py-1 bg-green-600 text-white rounded">Peta Soal</button>
      </div>

      <button @click="submitQuiz" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center space-x-2">
        <Icon name="heroicons-outline:paper-airplane" />
        <span>Kirim Jawaban</span>
      </button>

      <div v-if="showMap" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-4 rounded w-80">
          <h2 class="text-lg font-semibold mb-2">Peta Soal</h2>
          <div class="grid grid-cols-5 gap-2 mb-4">
            <button v-for="(q, idx) in quiz.questions" :key="q.question_id" @click="goToQuestion(idx)" :class="[ 'px-2 py-1 rounded', currentIndex === idx ? 'bg-green-600 text-white' : answers[q.question_id] ? 'bg-green-300' : 'bg-gray-300 dark:bg-gray-700']">
              {{ idx + 1 }}
            </button>
          </div>
          <button @click="showMap = false" class="px-3 py-1 bg-red-500 text-white rounded">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSwal } from "~/utils/swal";
const route = useRoute();
const config = useRuntimeConfig();
const swal = useSwal();
const token = useCookie("access_token").value;

const quiz = ref({ questions: [] });
const answers = ref({});
const currentIndex = ref(0);
const showMap = ref(false);
const loading = ref(true);

const currentQuestion = computed(() => quiz.value.questions[currentIndex.value]);

function nextQuestion() {
  if (currentIndex.value < quiz.value.questions.length - 1) currentIndex.value++;
}
function prevQuestion() {
  if (currentIndex.value > 0) currentIndex.value--;
}
function goToQuestion(idx) {
  currentIndex.value = idx;
  showMap.value = false;
}
function openMap() {
  showMap.value = true;
}

onMounted(async () => {
  const data = await $fetch(`${config.public.backend}/api/quiz/${route.params.quizId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  quiz.value = data;
  loading.value = false;
});

const submitQuiz = async () => {
  // Cek apakah semua soal sudah dijawab
  const unanswered = quiz.value.questions.filter(q => !answers.value[q.question_id]);
  if (unanswered.length > 0) {
    await swal.fire({
      icon: "warning",
      title: "Ada soal yang belum dijawab",
      text: "Harap jawab semua soal sebelum mengirim.",
    });
    return;
  }

  const submittedAnswers = Object.entries(answers.value).map(([question_id, option_id]) => ({
    question_id: parseInt(question_id),
    option_id: parseInt(option_id),
  }));

  try {
    const res = await $fetch(`${config.public.backend}/api/quiz/${route.params.quizId}/submit`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: { answers: submittedAnswers },
    });

    await swal.fire({
      icon: "success",
      title: "Quiz Terkirim!",
      html: `<p><b>Nama:</b> ${res.data.student}</p><p><b>Nilai:</b> ${res.data.score}</p>`,
    });

    await route.push("/student/quiz");
  } catch (err) {
    await swal.fire({
      icon: "error",
      title: "Gagal kirim",
      text: err.data?.error || "Terjadi kesalahan",
    });
  }
};
</script>

<style scoped>
input[type="radio"] {
  accent-color: #16a34a;
}
</style>
