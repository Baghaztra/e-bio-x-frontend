<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <!-- <div class="bg-light p-3" style="width: 250px; min-height: 100vh">
      <h4>Admin Panel</h4>
      <ul class="nav flex-column">
        <li class="nav-item">
          <NuxtLink to="/admin" class="nav-link">Dashboard</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/admin/users" class="nav-link">Manajemen User</NuxtLink>
        </li>
      </ul>
    </div> -->

    <!-- Content -->
    <div class="flex-fill p-4">
      <h2>Manajemen User</h2>

      <table class="table table-bordered mt-4">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>
                <select v-model="user.role" @change="updateUserRole(user)">
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                </select>
            </td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)">Hapus</button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="5" class="text-center">Tidak ada user</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRuntimeConfig, useRouter } from "#app";
const config = useRuntimeConfig();
const router = useRouter();

const users = ref([]);

onMounted(async () => {
  await fetchUsers();
});

const fetchUsers = async () => {
  try {
    users.value = await $fetch(`${config.public.backend}/api/users`);
  } catch (err) {
    console.error("Gagal mengambil data user", err);
  }
};

const updateUserRole = async (user) => {
  try {
    await $fetch(`${config.public.backend}/api/users/${user.id}`, {
      method: "PUT",
      body: { role: user.role }
    });
    alert("Role berhasil diupdate");
  } catch (err) {
    console.error(err);
    alert("Gagal update role");
  }
}

const deleteUser = async (id) => {
  if (!confirm("Yakin ingin menghapus user ini?")) return;
  try {
    await $fetch(`${config.public.backend}/api/users/${id}`, { method: "DELETE" });
    users.value = users.value.filter((u) => u.id !== id);
    alert("User berhasil dihapus");
  } catch (err) {
    alert("Gagal menghapus user");
    console.error(err);
  }
};
</script>
