<template>
  <div class="p-6 bg-white dark:bg-gray-900 rounded-xl dark:shadow-green-400 dark:border-none border shadow-lg border-green-200">
    <h2 class="text-xl font-semibold text-green-700 dark:text-green-500 flex items-center gap-2">
      <Icon name="arcticons:classchartsstudents" class="text-green-500" /> Daftar Siswa
      <small>({{ props.students.length }})</small>
    </h2>

    <div class="overflow-x-auto max-w-full">
    <AdminTable
      :data="props.students"
      :columns="columns"
      :pageSize="10" />
  </div>
  </div>
</template>

<script setup>
const props = defineProps({
  students: Array,
});

const columns = [
  { header: "Username", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
];
</script>
