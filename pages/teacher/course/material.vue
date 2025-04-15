<template>
  <!-- Modal Upload Materi -->
  <div class="modal fade" id="uploadMaterialModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content bg-white shadow-lg rounded-lg">
        <div class="modal-header border-b-2 border-green-600">
          <h5 class="modal-title text-lg font-semibold text-green-600">Upload Materi</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body py-4">
          <form @submit.prevent="uploadMaterial">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Judul Materi</label>
              <input v-model="newMaterial.title" type="text" class="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Kelas</label>
              <select v-model="newMaterial.classId" class="form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required>
                <option v-for="kelas in myClasses" :key="kelas.id" :value="kelas.id">
                  {{ kelas.name }}
                </option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">File Materi</label>
              <input type="file" class="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" @change="handleFileUpload" required>
            </div>
            <button type="submit" class="btn bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none">Upload</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
    <div class="card bg-white shadow-md rounded-lg overflow-hidden">
      <div class="card-body p-4">
        <h5 class="text-lg font-semibold text-gray-800">Buat Kuis</h5>
        <p class="text-sm text-gray-600 mb-4">Buat kuis baru untuk kelas Anda</p>
        <NuxtLink to="/teacher/create-quiz" class="btn bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">+ Kuis Baru</NuxtLink>
      </div>
    </div>
    <div class="card bg-white shadow-md rounded-lg overflow-hidden">
      <div class="card-body p-4">
        <h5 class="text-lg font-semibold text-gray-800">Upload Materi</h5>
        <p class="text-sm text-gray-600 mb-4">Unggah materi pembelajaran</p>
        <button class="btn bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700" data-bs-toggle="modal" data-bs-target="#uploadMaterialModal">+ Materi Baru</button>
      </div>
    </div>
    <div class="card bg-white shadow-md rounded-lg overflow-hidden">
      <div class="card-body p-4">
        <h5 class="text-lg font-semibold text-gray-800">Statistik</h5>
        <p class="text-sm text-gray-600 mb-4">Lihat statistik pembelajaran</p>
        <NuxtLink to="/teacher/statistics" class="btn bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Lihat Statistik</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>

const newMaterial = ref({
  title: '',
  classId: null,
  file: null
})

const uploadMaterial = async () => {
  // TODO: Implement material upload logic
  console.log('Uploading material:', newMaterial.value)
}

const handleFileUpload = (event) => {
  newMaterial.value.file = event.target.files[0]
}
</script>