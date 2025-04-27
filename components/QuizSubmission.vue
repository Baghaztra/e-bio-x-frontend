<template>
  <div class="max-w-3xl mx-auto p-6">
    <div v-if="loading">
      <p class="text-center text-gray-500">Loading...</p>
    </div>
    <div v-else-if="quiz && quiz.questions && !quiz.questions.length">
      <p class="text-center text-gray-500">Tidak ada pertanyaan untuk ditampilkan.</p>
    </div>
    <div v-else class="text-center mb-4">
      <h1 v-if="quiz.title" class="text-2xl font-bold mb-4">{{ quiz.title }}</h1>

      <form @submit.prevent="submitQuiz">
        <div v-for="(question, index) in quiz.questions" :key="question.question_id" class="mb-6">
          <p class="font-semibold mb-2">{{ index + 1 }}. {{ question.question_text }}</p>
          <div class="space-y-2">
            <label
              v-for="option in question.options"
              :key="option.option_id"
              class="flex items-center space-x-2">
              <input
                type="radio"
                :name="'question_' + question.question_id"
                :value="option.option_id"
                v-model="answers[question.question_id]"
                class="text-green-600 focus:ring-green-500"
                required />
              <span>{{ option.option_text }}</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center space-x-2">
          <Icon name="heroicons-outline:paper-airplane" />
          <span>Kirim Jawaban</span>
        </button>
      </form>
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
const startTime = ref(null);
const loading = ref(true);

onMounted(async () => {
  startTime.value = new Date();
  const data = await $fetch(`${config.public.backend}/api/quiz/${route.params.quizId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  quiz.value = data;
  loading.value = false;
});

const submitQuiz = async () => {
  const endTime = new Date();
  const diff = new Date(endTime - startTime.value);
  const workTime = diff.toISOString().substr(11, 8);

  const submittedAnswers = Object.entries(answers.value).map(([question_id, option_id]) => ({
    question_id: parseInt(question_id),
    option_id: parseInt(option_id),
  }));

  try {
    const res = await $fetch(`${config.public.backend}/api/quiz/${route.params.quizId}/submit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        work_time: workTime,
        answers: submittedAnswers,
      },
    });

    await swal.fire({
      icon: "success",
      title: "Quiz Terkirim!",
      html: `
          <p><b>Nama:</b> ${res.data.student}</p>
          <p><b>Nilai:</b> ${res.data.score}</p>
          <p><b>Waktu:</b> ${res.data.work_time}</p>
        `,
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
