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

    <!-- Kelas Aktif -->
    <div class="row mb-4">
      <div class="col-12">
        <h4>Kelas Saya</h4>
        <div class="row g-4">
          <div v-for="(kelas, index) in myClasses" :key="index" class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h5 class="card-title">{{ kelas.name }}</h5>
                  <span class="badge bg-primary">{{ kelas.students }} Siswa</span>
                </div>
                <p class="card-text">{{ kelas.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">Kode: {{ kelas.code }}</small>
                  <NuxtLink :to="'/teacher/class/' + kelas.id" class="btn btn-primary">
                    Kelola
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Buat Kuis</h5>
            <p class="card-text">Buat kuis baru untuk kelas Anda</p>
            <NuxtLink to="/teacher/create-quiz" class="btn btn-primary">
              + Kuis Baru
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Upload Materi</h5>
            <p class="card-text">Unggah materi pembelajaran</p>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadMaterialModal">
              + Materi Baru
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Statistik</h5>
            <p class="card-text">Lihat statistik pembelajaran</p>
            <NuxtLink to="/teacher/statistics" class="btn btn-primary">
              Lihat Statistik
            </NuxtLink>
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
                <input v-model="newClass.name" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Deskripsi</label>
                <textarea v-model="newClass.description" class="form-control" rows="3"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Buat Kelas</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Upload Materi -->
    <div class="modal fade" id="uploadMaterialModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Upload Materi</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="uploadMaterial">
              <div class="mb-3">
                <label class="form-label">Judul Materi</label>
                <input v-model="newMaterial.title" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Kelas</label>
                <select v-model="newMaterial.classId" class="form-select" required>
                  <option v-for="kelas in myClasses" :key="kelas.id" :value="kelas.id">
                    {{ kelas.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">File Materi</label>
                <input type="file" class="form-control" @change="handleFileUpload" required>
              </div>
              <button type="submit" class="btn btn-primary">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const myClasses = ref([
  // Dummy data
  {
    id: 1,
    name: 'Biologi Kelas X-A',
    description: 'Kelas reguler biologi semester 1',
    code: 'BIO1A',
    students: 30
  }
])

const newClass = ref({
  name: '',
  description: ''
})

const newMaterial = ref({
  title: '',
  classId: null,
  file: null
})

const createClass = async () => {
  // TODO: Implement create class logic
  console.log('Creating class:', newClass.value)
}

const uploadMaterial = async () => {
  // TODO: Implement material upload logic
  console.log('Uploading material:', newMaterial.value)
}

const handleFileUpload = (event) => {
  newMaterial.value.file = event.target.files[0]
}
</script> 