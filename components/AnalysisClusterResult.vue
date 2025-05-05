<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  clusters: Array
})

const selectedCluster = ref('Semua')
const sortBy = ref('cluster') // cluster | score | work_time

// Data ter-filter & terurut
const filteredClusters = computed(() => {
  let data = props.clusters

  if (selectedCluster.value !== 'Semua') {
    data = data.filter(item => item.cluster === parseInt(selectedCluster.value))
  }

  if (sortBy.value === 'score') {
    data = data.slice().sort((a, b) => b.score - a.score)
  } else if (sortBy.value === 'work_time') {
    data = data.slice().sort((a, b) => a.work_time.localeCompare(b.work_time))
  } else {
    data = data.slice().sort((a, b) => a.cluster - b.cluster)
  }

  return data
})

// Cluster unik untuk filter
const clusterOptions = computed(() => {
  const clusters = [...new Set(props.clusters.map(item => item.cluster))]
  return clusters.sort((a, b) => a - b)
})
</script>

<template>
  <div>
    <!-- Filter & Sort Control -->
    <div class="flex flex-wrap items-center gap-4 mb-4">
      <div>
        <label class="text-sm font-semibold text-green-700 mr-2">Filter Cluster:</label>
        <select v-model="selectedCluster" class="border rounded px-2 py-1 text-sm">
          <option value="Semua">Semua</option>
          <option v-for="c in clusterOptions" :key="c" :value="c">Cluster {{ c }}</option>
        </select>
      </div>

      <div>
        <label class="text-sm font-semibold text-green-700 mr-2">Urutkan:</label>
        <select v-model="sortBy" class="border rounded px-2 py-1 text-sm">
          <option value="cluster">Cluster</option>
          <option value="score">Nilai</option>
          <option value="work_time">Waktu Pengerjaan</option>
        </select>
      </div>
    </div>

    <!-- List Hasil -->
    <ul class="space-y-2">
      <li
        v-for="(item, index) in filteredClusters"
        :key="index"
      >
        <AnalysisStudentCart
          :nama="item.nama"
          :cluster="item.cluster"
          :score="item.score"
          :work_time="item.work_time" />
      </li>
    </ul>
  </div>
</template>
