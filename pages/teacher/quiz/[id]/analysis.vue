<template>
  <div class="p-6">
    <div class="flex items-center gap-3 mb-4">
      <Icon name="material-symbols:bar-chart" class="text-green-600" size="32" />
      <h1 class="text-2xl font-bold text-green-700">Analisis Hasil Kuis</h1>
    </div>

    <div v-if="isLoading" class="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6">
      <p class="text-yellow-800 text-sm">Loading ...</p>
    </div>
    <div
      v-else-if="!analysisReady"
      class="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6">
      <p class="text-yellow-800 text-sm">
        Analisis belum dilakukan. Klik tombol di bawah untuk memulai.
      </p>
    </div>

    <div v-else>
      <div class="bg-green-50 border border-green-300 rounded-xl p-6 mb-6 space-y-4">
        <h2 class="text-xl font-bold text-green-800 flex items-center gap-2">
          <Icon name="material-symbols:info" size="24" /> {{ quizInfo.title }}
        </h2>

        <div class="grid gap-4">
          <p class="text-sm text-green-700">
            Jumlah soal: <span class="font-semibold">{{ quizInfo.total_questions }}</span>
          </p>
          <p class="text-sm text-green-700">
            Jumlah siswa: <span class="font-semibold">{{ quizInfo.total_students }}</span>
          </p>
          <p class="text-sm text-green-700">
            Rata-rata Nilai: <span class="font-semibold">{{ quizInfo.average }}</span>
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-green-800 text-base font-semibold border-b border-green-300 pb-1">
            Statistik Siswa
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-green-700 mb-1">Nilai Tertinggi</p>
              <AnalysisStudentCart
                :nama="quizInfo.highest.nama"
                :cluster="quizInfo.highest.cluster"
                :score="quizInfo.highest.score"
                :work_time="quizInfo.highest.work_time" />
            </div>

            <div>
              <p class="text-sm text-green-700 mb-1">Nilai Terendah</p>
              <AnalysisStudentCart
                :nama="quizInfo.lowest.nama"
                :cluster="quizInfo.lowest.cluster"
                :score="quizInfo.lowest.score"
                :work_time="quizInfo.lowest.work_time" />
            </div>

            <div>
              <p class="text-sm text-green-700 mb-1">Pengerjaan Tercepat</p>
              <AnalysisStudentCart
                :nama="quizInfo.fastest.nama"
                :cluster="quizInfo.fastest.cluster"
                :score="quizInfo.fastest.score"
                :work_time="quizInfo.fastest.work_time" />
            </div>

            <div>
              <p class="text-sm text-green-700 mb-1">Pengerjaan Terlambat</p>
              <AnalysisStudentCart
                :nama="quizInfo.slowest.nama"
                :cluster="quizInfo.slowest.cluster"
                :score="quizInfo.slowest.score"
                :work_time="quizInfo.slowest.work_time" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border rounded-xl p-4 mb-6 shadow">
        <h3 class="text-green-800 text-lg font-semibold">Analisis K-Means</h3>
        <AnalysisChartCluster :labels="chartLabels" :datasets="chartDatasets" />
        <div class="mb-2 flex gap-3 items-center" @click="showStudentList = !showStudentList">
          <h5 class="text-green-700 text-md font-semibold">Daftar siswa</h5>
          <span class="text-green-700 flex items-center">
            <Icon
              name="mdi:chevron-down"
              :class="[
                'w-5 h-5 transition-transform duration-200',
                showStudentList ? 'rotate-0' : 'rotate-180',
              ]" />
          </span>
        </div>
        <div
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="showStudentList ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'">
          <AnalysisClusterResult :clusters="clusters" />
        </div>
      </div>

      <AnalysisDecisionTree :rules="decisionTree" />
    </div>

    <div class="flex gap-2 mt-6">
      <button
        @click="startAnalysis"
        class="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
        <Icon name="material-symbols:play-arrow" size="20" />
        {{ analysisReady ? "Analisis Ulang" : "Mulai Analisis" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSwal } from "~/utils/swal";
import Cookies from "js-cookie";
import AnalysisChartCluster from "~/components/AnalysisChartCluster.vue";

const config = useRuntimeConfig();
const token = Cookies.get("access_token");
const route = useRoute();
const quizId = route.params.id;

const swal = useSwal();

const clusters = ref([]);
const decisionTree = ref("");
const chartLabels = ref([]);
const chartDatasets = ref([]);
const isLoading = ref(true);
const showStudentList = ref(false);
const analysisReady = ref(false);
const quizInfo = ref({
  title: "",
  total_questions: 0,
  total_students: 0,
  highest: { nama: "-", cluster: "-", work_time: "-", score: 0 },
  lowest: { nama: "-", cluster: "-", work_time: "-", score: 0 },
  average: 0,
  fastest: { nama: "-", cluster: "-", work_time: "-", score: 0 },
  slowest: { nama: "-", cluster: "-", work_time: "-", score: 0 },
});

const startAnalysis = async () => {
  try {
    await $fetch(`${config.public.backend}/api/analysis/${quizId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    await getAnalysis();
    swal.fire({
      icon: "success",
      title: "Analisis Dimulai",
      text: "Analisis berhasil dijalankan.",
    });
  } catch (error) {
    console.error(error);
    swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal memulai analisis.",
    });
  }
};

const getAnalysis = async () => {
  try {
    const res = await $fetch(`${config.public.backend}/api/analysis/${quizId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    clusters.value = res.clusters;
    decisionTree.value = res.decision_tree_rules;

    quizInfo.value = {
      title: res.quiz_title,
      total_questions: res.total_questions,
      total_students: res.total_students,
      highest: res.highest_score,
      lowest: res.lowest_score,
      average: res.average_score.toFixed(2),
      fastest: res.fastest_work_time,
      slowest: res.slowest_work_time,
    };

    const clusterCounts = {};
    res.clusters.forEach((item) => {
      const clusterLabel = `Cluster ${item.cluster}`;
      clusterCounts[clusterLabel] = (clusterCounts[clusterLabel] || 0) + 1;
    });

    chartLabels.value = Object.keys(clusterCounts);
    chartDatasets.value = [
      {
        label: "Jumlah Siswa",
        backgroundColor: ["#ef4444", "#3b82f6", "#facc15"],
        data: Object.values(clusterCounts),
      },
    ];

    analysisReady.value = true;
  } catch (error) {
    console.error(error);
    analysisReady.value = false;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getAnalysis();
});
</script>
