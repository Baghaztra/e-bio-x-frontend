<template>
  <div>
    <div class="flex mb-4 justify-between items-center">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search..."
        class="border bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-2 w-full max-w-xs"
      />
    </div>

    <div class="overflow-x-auto border rounded">
      <table class="table-auto w-full text-left">
        <thead class="bg-green-100">
          <tr>
            <th v-for="(col, index) in columns" :key="index" class="p-3 border-b text-green-600">
              {{ col.header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, rowIdx) in paginatedData"
            :key="rowIdx"
            class="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td v-for="(col, colIdx) in columns" :key="colIdx" class="p-3">
              <component
                v-if="col.cell"
                :is="col.cell"
                :item="item"
              />
              <span v-else>{{ item[col.accessorKey] }}</span>
            </td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td :colspan="columns.length" class="text-center text-gray-500 p-4">
              {{ emptyMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center mt-4 text-sm text-gray-600">
      <p>
        Menampilkan {{ Math.min((currentPage - 1) * pageSize + 1, totalItems) }}
        - {{ Math.min(currentPage * pageSize, totalItems) }} dari {{ totalItems }} data
      </p>
      <div class="flex gap-2">
        <button
          @click="currentPage = Math.max(currentPage - 1, 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          @click="currentPage = Math.min(currentPage + 1, totalPages)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  data: Array,
  columns: Array,
  pageSize: {
    type: Number,
    default: 10,
  },
  emptyMessage: {
    type: String,
    default: 'Tidak ada data ditemukan.',
  },
})

const searchTerm = ref('')
const currentPage = ref(1)

const filteredData = computed(() =>
  props.data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  )
)

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / props.pageSize)
)
const totalItems = computed(() => filteredData.value.length)

const paginatedData = computed(() =>
  filteredData.value.slice(
    (currentPage.value - 1) * props.pageSize,
    currentPage.value * props.pageSize
  )
)

watch(searchTerm, () => (currentPage.value = 1))
</script>
