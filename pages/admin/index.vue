<template>
  <div class="flex">
    <!-- Content -->
    <div class="flex-1 p-4">
      <h2 class="text-2xl font-semibold text-green-600">Manajemen User</h2>

      <table class="table-auto w-full mt-4 text-sm text-left text-gray-700">
        <thead class="bg-green-100">
          <tr>
            <th class="px-4 py-2 font-semibold text-green-600">#</th>
            <th class="px-4 py-2 font-semibold text-green-600">Email</th>
            <th class="px-4 py-2 font-semibold text-green-600">Username</th>
            <th class="px-4 py-2 font-semibold text-green-600">Role</th>
            <th class="px-4 py-2 font-semibold text-green-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">
              <select
                v-model="user.role"
                @change="updateUserRole(user)"
                class="form-select border-green-300 focus:ring-green-500">
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </td>
            <td class="px-4 py-2">
              <button
                class="bg-red-500 text-white hover:bg-red-600 p-1 rounded"
                @click="deleteUser(user.id)">
                <Icon name="material-symbols:delete" class="w-4  h-4 " />
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="5" class="text-center text-gray-500">Tidak ada user</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRuntimeConfig, useRouter } from "#app";
const config = useRuntimeConfig();
const router = useRouter();

const users = ref([]);

onMounted(async () => {
  await fetchUsers();
});

const fetchUsers = async () => {
  try {
    users.value = await $fetch(`${config.public.backend}/api/users`,{
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
  } catch (err) {
    console.error("Gagal mengambil data user", err);
  }
};
const updateUserRole = async (user) => {
  // BUG: Jika dibatalkan, role masih berubah di client
  const confirm = await Swal.fire({
    icon: "warning",
    title: `Ubah ${user.name} menjadi ${user.role}?`,
    showCancelButton: true,
    confirmButtonText: "Ya, ubah",
    cancelButtonText: "Batal",
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#dc2626",
  });

  if (!confirm.isConfirmed) return;
  try {
    await $fetch(`${config.public.backend}/api/users/${user.id}`, {
      method: "PUT",
      body: { role: user.role },
    });

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Role berhasil diupdate",
      confirmButtonColor: "#16a34a", // hijau-600
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal update role",
      confirmButtonColor: "#16a34a",
    });
  }
};

const deleteUser = async (id) => {
  const confirm = await Swal.fire({
    icon: "warning",
    title: "Yakin ingin menghapus user ini?",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal",
    confirmButtonColor: "#dc2626", // merah-600
    cancelButtonColor: "#16a34a", // hijau-600
  });

  if (!confirm.isConfirmed) return;

  try {
    await $fetch(`${config.public.backend}/api/users/${id}`, { method: "DELETE" });
    users.value = users.value.filter((u) => u.id !== id);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "User berhasil dihapus",
      confirmButtonColor: "#16a34a",
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal menghapus user",
      confirmButtonColor: "#16a34a",
    });
  }
};

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  role: 'admin'
});
</script>
