<template>
  <div class="container py-4">
    <h1 class="text-3xl font-semibold text-green-600">Kelas {{ course.name }}</h1>
    <span class="text-lg text-gray-700">Bareng {{ course.teacher }}</span>

    <h2 class="mt-4 text-xl font-semibold text-green-600">Daftar Siswa ({{ course.students_count }})</h2>

    <table class="table-auto w-full mt-2 text-sm text-left text-gray-700">
      <thead class="bg-green-100">
        <tr  class="border-b">
          <th class="px-4 py-2 text-left text-sm font-semibold text-green-700">#</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-green-700">Nama</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-green-700">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in course.students" :key="student.id"  class="border-b">
          <td class="px-4 py-2 text-sm text-gray-800">{{ index + 1 }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ student.name }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ student.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const route = useRoute();
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
  console.error("Gagal mengambil kelas:", error.value);
} else {
  course.value = data.value;
}
</script>
