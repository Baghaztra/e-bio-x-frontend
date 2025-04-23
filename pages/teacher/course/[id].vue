<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-3xl font-bold text-green-600">{{ course.name }}</h1>
    <span class="text-lg text-gray-600">Bareng {{ course.teacher }}</span>

    <div class="flex space-x-4 border-b mt-4">
      <button
        @click="activeTab = 'materi'"
        :class="[
          'px-4 py-2 border-t border-l border-r rounded-t-lg text-sm font-medium',
          activeTab === 'materi'
            ? 'bg-white text-green-600 border-green-200 shadow-lg'
            : 'bg-gray-100 text-gray-600 border-white',
        ]">
        <Icon name="simple-icons:bookstack" />
        Materi
      </button>
      <button
        @click="activeTab = 'upload-materi'"
        :class="[
          'px-4 py-2 border-t border-l border-r rounded-t-lg text-sm font-medium',
          activeTab === 'upload-materi'
            ? 'bg-white text-green-600 border-green-200 shadow-lg'
            : 'bg-gray-100 text-gray-600 border-white',
        ]">
        <Icon name="material-symbols:upload-rounded" />
        Upload
      </button>
      <button
        @click="activeTab = 'siswa'"
        :class="[
          'px-4 py-2 border-t border-l border-r rounded-t-lg text-sm font-medium',
          activeTab === 'siswa'
            ? 'bg-white text-green-600 border-green-200 shadow-lg'
            : 'bg-gray-100 text-gray-600 border-white',
        ]">
        <Icon name="arcticons:classchartsstudents" />
        Siswa
      </button>
    </div>

    <div class="mb-3">
      <UploadMaterial v-if="activeTab === 'upload-materi'" class="mb-3" :courseId="courseId" />
      <ViewMaterial v-if="activeTab === 'materi'" class="mb-3" :courseId="courseId" />
      <StudentList v-if="activeTab === 'siswa'" class="mb-3" :students="course.students" />
    </div>
  </div>
</template>

<script setup>
import { useSwal } from "~/utils/swal";

const activeTab = ref("materi");
const route = useRoute();
const swal = useSwal();
const courseId = route.params.id;

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
  swal.fire({
    icon: "error",
    title: "Gagal",
    text: "Terjadi kesalahan saat memuat data kelas",
  });
} else {
  course.value = data.value;
}
</script>
