<template>
  <div class="container py-4">
    <div class="row mb-4">
      <div class="col-md-8">
        <h2>Dashboard Guru</h2>
      </div>
      <div class="col-md-4 text-end">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createClassModal">
          + Buat Kelas Baru
        </button>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-12">
        <h4>Kelas Saya</h4>
        <div class="row g-4">
          <div v-for="(kelas, index) in myCourses" :key="index" class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h5 class="card-title">{{ kelas.name }}</h5>
                  <span class="badge bg-primary">{{ kelas.students }} Siswa</span>
                </div>
                <p class="card-text">{{ kelas.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">Kode: {{ kelas.code }}</small>
                  <NuxtLink :to="'/teacher/course/' + kelas.id" class="btn btn-primary">
                    Kelola
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Buat Kelas -->
    <div class="modal fade" id="createClassModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Buat Kelas Baru</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createClass">
              <div class="mb-3">
                <label class="form-label">Nama Kelas</label>
                <input v-model="newCourseName" type="text" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary">Buat Kelas</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const token = useCookie("access_token").value
const myCourses = ref([])

const { data, error } = await useAsyncData('my-courses', () =>
  $fetch(`${config.public.backend}/api/courses/teacher`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
)

if (error.value) {
  console.error("Gagal mengambil kelas:", error.value)
} else {
  myCourses.value = data.value
}

const newCourseName = ref("")

const createClass = async () => {
  try {
    await $fetch(`${config.public.backend}/api/courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newCourseName.value
      })
    })
    alert("Kelas berhasil dibuat")
  } catch (err) {
    console.error("Gagal membuat kelas:", err)
  }
}
</script>
