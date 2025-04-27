<template>
  <div class="container py-4">
    <h1 class="text-3xl font-semibold text-green-600">Kelas {{ course.name }}</h1>
    <span class="text-lg text-gray-700">Bareng {{ course.teacher }}</span>

    <div class="flex space-x-4 border-b mt-4">
      <button
        @click="activeTab = 'materi'"
        :class="[
          'px-4 py-2 border-t border-l border-r rounded-t-lg text-sm font-medium',
          activeTab === 'materi'
            ? 'bg-white text-green-600 border-green-600'
            : 'bg-gray-100 text-gray-600 border-gray-300',
        ]">
        <Icon name="simple-icons:bookstack" />
        Materi
      </button>
      <button
        @click="activeTab = 'kuis'"
        :class="[
          'px-4 py-2 border-t border-l border-r rounded-t-lg text-sm font-medium',
          activeTab === 'kuis'
            ? 'bg-white text-green-600 border-green-600'
            : 'bg-gray-100 text-gray-600 border-gray-300',
        ]">
        <Icon name="hugeicons:quiz-04" />
        Kuis
      </button>
      <button
        @click="activeTab = 'siswa'"
        :class="[
          'px-4 py-2 border-t border-l border-r rounded-t-lg text-sm font-medium',
          activeTab === 'siswa'
            ? 'bg-white text-green-600 border-green-600'
            : 'bg-gray-100 text-gray-600 border-gray-300',
        ]">
        <Icon name="arcticons:classchartsstudents" />
        Siswa
      </button>
    </div>

    <div class="mb-3">
      <MaterialList v-if="activeTab === 'materi'" :courseId="courseId" />
      <QuizList v-if="activeTab === 'kuis'" :courseId="courseId" />
      <StudentList v-if="activeTab === 'siswa'" :students="course.students" />
    </div>
  </div>
</template>

<script setup>
import MaterialList from '~/components/MaterialList.vue';

const route = useRoute();
const courseId = route.params.id;

const activeTab = ref("materi");
const config = useRuntimeConfig();
const token = useCookie("access_token").value;
const course = ref([]);

const { data, error } = await useAsyncData("my-courses", () =>
  $fetch(`${config.public.backend}/api/courses/${courseId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
);

if (error.value) {
  console.error("Gagal mengambil kelas:", error.value);
} else {
  course.value = data.value;
}
</script>
