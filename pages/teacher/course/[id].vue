<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-3xl font-bold text-green-600">{{ course.name }}</h1>
    <span class="text-lg text-gray-600">Bareng {{ course.teacher }}</span>

    <StudentList class="my-3" :students="course.students"/>

    <UploadMaterial class="my-3" :courseId="courseId" />

    <ViewMaterial class="my-3" :courseId="courseId" />
  </div>
</template>

<script setup>
import { useSwal } from '~/utils/swal';

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
