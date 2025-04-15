<template>
  <div class="container py-4">
    <div class="row mb-4">
      <div class="col-md-8">
        <h2>Dashboard Siswa</h2>
      </div>
      <div class="col-md-4">
        <!-- Form Kode Kelas -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Gabung Kelas</h5>
            <form @submit.prevent="joinClass">
              <div class="input-group">
                <input 
                  type="text" 
                  v-model="classCode"
                  class="form-control" 
                  placeholder="Masukkan kode kelas"
                  required
                >
                <button class="btn btn-primary" type="submit">Gabung</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Daftar Kelas -->
    <div class="row mb-4">
      <div class="col-12">
        <h4>Kelas Saya</h4>
        <div class="row g-4">
          <div v-for="(kelas, index) in enrolledClasses" :key="index" class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">{{ kelas.name }}</h5>
                <p class="card-text">Bareng {{ kelas.teacher }}</p>
                <NuxtLink :to="'/student/course/' + kelas.id" class="btn btn-primary">
                  Masuk Kelas
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Kuis Aktif -->
    <div class="row">
      <div class="col-12">
        <h4>Kuis Aktif</h4>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Judul Kuis</th>
                <th>Kelas</th>
                <th>Tenggat</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(quiz, index) in activeQuizzes" :key="index">
                <td>{{ quiz.title }}</td>
                <td>{{ quiz.className }}</td>
                <td>{{ quiz.deadline }}</td>
                <td>
                  <span :class="'badge ' + quiz.statusClass">
                    {{ quiz.status }}
                  </span>
                </td>
                <td>
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
const config = useRuntimeConfig()
const token = useCookie("access_token").value
const enrolledClasses = ref([])

const classCode = ref('')

const activeQuizzes = ref([
  // Dummy data
  {
    id: 1,
    title: 'Kuis Sistem Pencernaan',
    className: 'Biologi Kelas X-A',
    deadline: '2024-03-15',
    status: 'Belum Dikerjakan',
    statusClass: 'bg-warning'
  }
])

const loadEnrolledClasses = async () => {
  const { data, error } = await useAsyncData('my-courses', () =>
    $fetch(`${config.public.backend}/api/courses/student`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  )

  if (error.value) {
    console.error("Gagal mengambil kelas:", error.value)
  } else {
    enrolledClasses.value = data.value
  }
}

const joinClass = async () => {
  try {
    await $fetch(`${config.public.backend}/api/courses/enroll/${classCode.value}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    await loadEnrolledClasses()
  } catch (err) {
    console.error("Gagal bergabung ke kelas:", err)
  }
}


await loadEnrolledClasses()
</script> 