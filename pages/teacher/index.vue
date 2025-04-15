<template>
  <div class="container mx-auto px-4 py-4">
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold mb-3">
        Halo, <span class="text-green-600">{{ useCookie("username").value }}</span
        >!
      </h2>
      <button
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        @click="showModal = true">
        + Buat Kelas Baru
      </button>
    </div>

    <h4 class="text-lg font-medium mb-4">Kelas Saya</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(kelas, index) in myCourses"
        :key="index"
        class="bg-white border rounded-lg p-4 shadow">
        <div class="flex justify-between items-start mb-2">
          <h5 class="text-lg font-semibold">{{ kelas.name }}</h5>
          <span class="bg-green-100 text-green-600 text-sm px-2 py-1 rounded">
            <Icon name="mdi:account-multiple" />
            {{ kelas.students }}
          </span>
        </div>
        <p class="text-sm text-gray-600 mb-4">{{ kelas.description }}</p>
        <div class="flex justify-between items-center text-sm text-gray-500">
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">Kode: {{ kelas.code }}</span>
            <button
              @click="copyToClipboard(kelas.code)"
              class="text-green-600 hover:text-green-800 transition duration-200">
              <Icon name="material-symbols:content-copy" class="w-5 h-5" />
            </button>
          </div>

          <NuxtLink
            :to="'/teacher/course/' + kelas.id"
            class="inline-flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition">
            <Icon name="mdi:cog" class="w-4 h-4" />
            Kelola
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Modal Buat Kelas -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h5 class="text-lg font-semibold">Buat Kelas Baru</h5>
          <button @click="showModal = false" class="text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>
        <form @submit.prevent="createClass">
          <label class="block text-sm font-medium mb-1">Nama Kelas</label>
          <input
            v-model="newCourseName"
            type="text"
            class="w-full border rounded px-3 py-2 mb-4"
            required />
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
            Buat Kelas
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";

const config = useRuntimeConfig();
const token = useCookie("access_token").value;
const myCourses = ref([]);

const showModal = ref(false);

const fetchCoursesData = async () => {
  const { data, error } = await useAsyncData("my-courses", () =>
    $fetch(`${config.public.backend}/api/courses/teacher`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  if (error.value) {
    console.error("Gagal mengambil kelas:", error.value);
  } else {
    myCourses.value = data.value;
  }
};

const newCourseName = ref("");

const createClass = async () => {
  try {
    await $fetch(`${config.public.backend}/api/courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCourseName.value,
      }),
    });

    newCourseName.value = "";
    showModal.value = false;
    fetchCoursesData();

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Kelas berhasil dibuat",
      confirmButtonColor: "#22c55e",
    });
  } catch (err) {
    console.error("Gagal membuat kelas:", err);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat membuat kelas",
      confirmButtonColor: "#f43f5e",
    });
  }
};

const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        // TODO: Snackbar notifikasi
        // .then(() => {
        //   console.log('Teks berhasil disalin!');
        // })
        // .catch(err => {
        //   console.error('Gagal menyalin teks:', err);
        // });
    } else {
      console.error('Clipboard tidak tersedia.');
    }
  }
fetchCoursesData();
</script>
