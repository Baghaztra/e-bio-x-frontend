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
        :pageSize="10"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  students: Array,
});

console.log("Students:", props.students);

const columns = [
  { header: "Username", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  {
    header: "Quiz Scores",
    accessorKey: "quizes",
    cell: ({ row }) => {
      const quizes = row.original.quizes;
      if (!quizes || quizes.length === 0) return "Belum ada kuis dikerjakan";
      return `
        <div class="flex flex-col gap-2">
          ${quizes
            .map(
              (q, index) => `
                <div class="bg-green-50 dark:bg-green-800 border border-green-200 dark:border-green-600 rounded-lg p-2">
                  <div class="font-semibold text-green-700 dark:text-green-300">${q.title}</div>
                  <div class="text-gray-900 dark:text-gray-100">Skor: ${q.score.toFixed(2)}</div>
                  <div class="text-gray-900 dark:text-gray-100">Cluster: ${q.cluster}</div>
                </div>
              `
            )
            .join("")}
        </div>
      `;
    },
  },
];
</script>
