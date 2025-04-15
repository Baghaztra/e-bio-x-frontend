<template>
  <div class="container py-4">
    <!-- Header Dashboard -->
    <div class="row mb-4">
      <div class="col-md-8">
        <h2 class="text-2xl font-semibold">
          Hi, <span class="text-green-600">{{ useCookie("username").value }}</span>!
        </h2>
      </div>
      <div class="col-md-4">
        <!-- Form Kode Kelas -->
        <div class="card bg-white shadow-md rounded-lg overflow-hidden">
          <div class="card-body p-4">
            <h5 class="text-lg font-semibold text-gray-800">Gabung Kelas</h5>
            <form @submit.prevent="joinClass" class="w-full max-w-md">
              <div class="flex">
                <input
                  type="text"
                  v-model="classCode"
                  class="form-input flex-1 border border-gray-300 rounded-l-md ps-3 focus:ring-green-500 focus:border-green-500"
                  placeholder="Masukkan kode kelas"
                  required />
                <button
                  type="submit"
                  class="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700">
                  Gabung
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Daftar Kelas -->
    <div class="row mb-5">
      <div class="col-12">
        <h4 class="text-xl font-semibold text-green-600">Kelas Saya</h4>
        <div v-if="enrolledClasses.length === 0" class="text-gray-500 text-sm mt-4">
          Kamu belum terdaftar di kelas manapun. Dapatkan kode kelas dari gurumu!
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(kelas, index) in enrolledClasses"
            :key="index"
            class="card bg-white shadow-md rounded-lg overflow-hidden">
            <div class="card-body p-4">
              <h5 class="text-lg font-semibold text-gray-800">{{ kelas.name }}</h5>
              <p class="text-sm text-gray-600 mb-4">Bareng {{ kelas.teacher }}</p>
              <NuxtLink
                :to="'/student/course/' + kelas.id"
                class="btn bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Masuk Kelas
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Kuis Aktif -->
    <div class="row mb-4">
      <div class="col-12">
        <h4 class="text-xl font-semibold text-green-600">Kuis Aktif</h4>
        <div class="overflow-x-auto">
          <table class="table-auto w-full text-sm text-left text-gray-700">
            <thead>
              <tr>
                <th class="px-4 py-2 font-semibold text-green-600">Judul Kuis</th>
                <th class="px-4 py-2 font-semibold text-green-600">Kelas</th>
                <th class="px-4 py-2 font-semibold text-green-600">Tenggat</th>
                <th class="px-4 py-2 font-semibold text-green-600">Status</th>
                <th class="px-4 py-2 font-semibold text-green-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(quiz, index) in activeQuizzes" :key="index">
                <td class="px-4 py-2">{{ quiz.title }}</td>
                <td class="px-4 py-2">{{ quiz.className }}</td>
                <td class="px-4 py-2">{{ quiz.deadline }}</td>
                <td class="px-4 py-2">
                  <span
                    :class="'badge ' + quiz.statusClass"
                    class="px-3 py-1 text-white rounded-full text-xs">
                    {{ quiz.status }}
                  </span>
                </td>
                <td class="px-4 py-2">
                  <!-- <NuxtLink :to="'/student/quiz/' + quiz.id" class="btn btn-sm btn-primary">
                    Kerjakan
                  </NuxtLink> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const token = useCookie("access_token").value;
const enrolledClasses = ref([]);

const classCode = ref("");

const activeQuizzes = ref([
  // Dummy data
  {
    id: 1,
    title: "Kuis Sistem Pencernaan",
    className: "Biologi Kelas X-A",
    deadline: "2024-03-15",
    status: "Belum Dikerjakan",
    statusClass: "bg-yellow-500",
  },
]);

const fetchCoursesData = async () => {
  const { data, error } = await useAsyncData("my-courses", () =>
    $fetch(`${config.public.backend}/api/courses/student`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  if (error.value) {
    console.error("Gagal mengambil kelas:", error.value);
  } else {
    enrolledClasses.value = data.value;
  }
};

const joinClass = async () => {
  try {
    await $fetch(`${config.public.backend}/api/courses/enroll/${classCode.value}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    await fetchCoursesData();
    classCode.value = "";
  } catch (err) {
    console.error("Gagal bergabung ke kelas:", err);
  }
};

await fetchCoursesData();
</script>
