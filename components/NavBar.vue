<template>
  <nav class="bg-green-700 text-white shadow">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap">
      <!-- Tombol Back -->
      <button
        v-if="!['/', '/student', '/teacher', '/admin'].includes($route.path)"
        class="flex items-center text-white hover:bg-green-600 p-2 rounded-md transition duration-200 ease-in-out transform hover:scale-110"
        @click="$router.back()">
        <Icon name="material-symbols:arrow-back-ios-new" class="w-5 h-5 mr-2" />
      </button>

      <!-- Brand -->
      <span class="text-lg font-bold"> E-Bio-X </span>

      <!-- TODO: Colapsal menu -->
      <ul class="flex items-center gap-4">
        <li>
          <a
            href="#"
            @click.prevent="handleLogout"
            class="text-white bg-green-700 px-4 py-2 rounded-md hover:bg-red-500 transition duration-200 ease-in-out flex items-center justify-center space-x-2">
            <Icon name="material-symbols:logout" class="w-5 h-5" />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { useSwal } from '~/utils/swal'

const router = useRouter()
const swal = useSwal()

const handleLogout = async () => {
  const result = await swal.fire({
    title: 'Yakin mau keluar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Keluar',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    Cookies.remove("access_token")
    Cookies.remove("email")
    Cookies.remove("username")
    Cookies.remove("role")
    Cookies.remove("picture")

    router.replace("/")
  }
}
</script>
