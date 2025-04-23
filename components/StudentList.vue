<template>
    <div class="p-6 bg-white rounded-2xl shadow-lg border border-green-200">
      <button
        @click="isOpen = !isOpen"
        class="w-full flex justify-between items-center p-4 bg-green-100 text-green-800 rounded-t-2xl">
        <h2 class="text-xl font-semibold text-green-700 flex items-center gap-2">
          <Icon name="arcticons:classchartsstudents" class="text-green-500" /> Daftar Siswa <small>({{ props.students.length }})</small>
        </h2>
      </button>
  
      <div v-if="isOpen" class="p-4">
        <div v-if="props.students?.length == 0">
          <p class="text-gray-500">Belum ada materi yang diupload.</p>
        </div>
        <table class="table-auto w-full my-2 text-sm text-left text-gray-700">
      <thead class="bg-green-100">
        <tr class="border-b">
          <th class="px-4 py-2 text-left text-sm font-semibold text-green-700">#</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-green-700">Nama</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-green-700">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in props.students" :key="student.id" class="border-b">
          <td class="px-4 py-2 text-sm text-gray-800">{{ index + 1 }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ student.name }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ student.email }}</td>
        </tr>
      </tbody>
    </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const isOpen = ref(false);
  const props = defineProps({
    students: Array,
  });
  </script>
  