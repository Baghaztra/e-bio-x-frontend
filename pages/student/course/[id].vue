<template>
  <div>
    <h1>Kelas {{ course.name }}</h1>
    <span>With {{ course.teacher }}</span>

    <h2 class="mt-4">Daftar Siswa ({{ course.students_count }})</h2>

    <table class="table table-bordered table-striped mt-2">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Nama</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in course.students" :key="student.id">
          <td>{{ index + 1 }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
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
