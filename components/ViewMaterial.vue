<template>
  <div class="p-6 bg-white rounded-2xl shadow-lg border border-green-200">
    <button
      @click="isOpen = !isOpen"
      class="w-full flex justify-between items-center p-4 bg-green-100 text-green-800 rounded-t-2xl">
      <h2 class="text-xl font-semibold text-green-700 flex items-center gap-2">
        <Icon name="simple-icons:bookstack" class="text-green-500" /> Lihat Materi
      </h2>
    </button>

    <div v-if="isOpen" class="p-4">
      <div v-if="materials && materials.length == 0">
        <p class="text-gray-500">Belum ada materi yang diupload.</p>
      </div>
      <div
        v-for="material in materials"
        :key="material.id"
        class="mb-4 p-5 bg-green-50 border border-green-200 rounded-xl shadow-sm hover:shadow-lg transition duration-300 ease-in-out relative">
        <button
          v-if="useCookie('role').value === 'teacher'"
          @click="deleteMateri(material.id)"
          class="absolute top-4 right-4 text-red-600 w-6 h-6 flex items-center justify-center hover:text-red-700">
          <Icon name="material-symbols:delete-rounded" class="w-5 h-5" />
        </button>
        <div class="flex items-center gap-3 mb-3">
          <Icon name="material-symbols:menu-book-outline-rounded" class="text-green-600 text-2xl" />
          <h3 class="text-lg font-semibold text-green-800">{{ material.title }}</h3>
        </div>
        <p class="text-gray-600 mb-3 text-sm leading-relaxed">
          {{ material.description }}
        </p>
        <a
          :href="material.file_url"
          target="_blank"
          class="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-medium transition">
          <Icon name="material-symbols:open-in-new-rounded" class="text-lg" />
          Lihat Materi
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSwal } from "~/utils/swal";

const isOpen = ref(true);
const token = useCookie("access_token").value;
const swal = useSwal();
const props = defineProps({
  courseId: String,
});

const materials = ref([]);

const fetchData = async () => {
  try {
    const response = await $fetch(
      `${useRuntimeConfig().public.backend}/api/courses/materials/${props.courseId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    materials.value = response.data;
  } catch (err) {
    swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat memuat materi",
    });
  }
};
const deleteMateri = async (materialId) => {
  swal.fire({
    title: "Menghapus...",
    text: "Mohon tunggu",
    allowOutsideClick: false,
    didOpen: () => {
      swal.showLoading();
    },
  });

  try {
    await $fetch(`${useRuntimeConfig().public.backend}/api/materials/${materialId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Materi berhasil dihapus",
    });
  } catch (err) {
    swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat menghapus materi",
    });
  } finally {
    fetchData();
  }
};

fetchData();
</script>
