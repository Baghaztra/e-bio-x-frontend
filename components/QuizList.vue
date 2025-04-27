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
            class="border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-800">{{ quiz.title }}</h3>
                <p class="text-sm text-gray-500">Tanggal dibuat: {{ formatDate(quiz.created_at) }}</p>
                <p class="text-sm text-gray-500">Jumlah pertanyaan: {{ quiz.questions.length }}</p>
                <p class="text-sm mt-1" :class="quiz.is_closed ? 'text-red-500' : 'text-green-600'">
                  <Icon :name="quiz.is_closed ? 'mdi:lock' : 'mdi:lock-open'" class="inline mr-1" />
                  Status: {{ quiz.is_closed ? "Ditutup" : "Terbuka" }}
                </p>
              </div>

              <div class="flex items-center gap-3">
                <button
                  v-if="role === 'student' && !quiz.is_closed && !quiz.is_submited"
                  @click="startQuiz(quiz.quiz_id)"
                  class="bg-green-600 text-white px-3 py-1.5 text-sm rounded hover:bg-green-700 flex items-center gap-1"
                >
                  <Icon name="mdi:play-circle-outline" />
                  Kerjakan
                </button>

                <button
                  v-if="role === 'teacher'"
                  @click="deleteQuiz(quiz.quiz_id)"
                  class="text-red-600 text-sm hover:underline flex items-center gap-1"
                >
                  <Icon name="mdi:trash-can-outline" />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSwal } from "~/utils/swal";

const router = useRouter()
const token = useCookie("access_token").value;
const role = useCookie("role").value;
const swal = useSwal();

const props = defineProps({
  courseId: {
    type: Number,
    required: true,
  },
});

const quizzes = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchQuizzes = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await $fetch(
      `${useRuntimeConfig().public.backend}/api/course/quiz/${props.courseId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    quizzes.value = res.quizzes;
    
  } catch (err) {
    console.error(err);
    error.value = "Gagal memuat data kuis.";
    swal.fire("Error", "Gagal memuat data kuis.", "error");
  } finally {
    loading.value = false;
  }
};

const deleteQuiz = async (quizId) => {
  const result = await swal.fire({
    title: "Hapus Kuis",
    text: "Apakah Anda yakin ingin menghapus kuis ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  if (result.isConfirmed) {
    try {
      await $fetch(
        `${useRuntimeConfig().public.backend}/api/quiz/${quizId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      swal.fire("Terhapus!", "Kuis telah dihapus.", "success");
      fetchQuizzes();
    } catch (err) {
      console.error(err);
      swal.fire("Error", "Gagal menghapus kuis.", "error");
    }
  }
};

function startQuiz(quizId) { 
  swal.fire({
    title: 'Mulai Kuis?',
    text: 'Timer akan langsung berjalan setelah kamu mulai.',
    icon: 'warning',
  }).then((result) => {
    if (result.isConfirmed) {
      router.push(`/student/quiz/${quizId}`)
    }
  })
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("id-ID");
};

fetchQuizzes();
</script>
