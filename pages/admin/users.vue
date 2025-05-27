<script setup>
import { useSwal } from "~/utils/swal";
import Cookies from "js-cookie";
import { useRuntimeConfig } from "#app";
import { ref, onMounted } from "vue";

const config = useRuntimeConfig();
const users = ref([]);

onMounted(async () => {
  await fetchUsers();
});

const token = Cookies.get("access_token");
const swal = useSwal();
const toast = useToast();

const fetchUsers = async () => {
  try {
    users.value = await $fetch(`${config.public.backend}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error("Gagal ambil user", err);
  }
};

const createUser = async () => {
  const { value: formValues } = await swal.fire({
    title: "Tambah User Baru",
    html:
      '<input id="swal-input-name" class="p-2 mb-3 w-full" placeholder="Nama">' +
      '<input id="swal-input-email" class="p-2 mb-3 w-full" placeholder="Email" type="email">' +
      '<input id="swal-input-password" class="p-2 mb-3 w-full" placeholder="Password" type="password">' +
      '<select id="swal-input-role" class="p-2 mb-3 w-full">' +
        '<option value="" disabled selected>Pilih Role</option>' +
        '<option value="student">Student</option>' +
        '<option value="teacher">Teacher</option>' +
        '<option value="admin">Admin</option>' +
      '</select>',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Simpan",
    cancelButtonText: "Batal",
    preConfirm: () => {
      const name = document.getElementById('swal-input-name').value;
      const email = document.getElementById('swal-input-email').value;
      const password = document.getElementById('swal-input-password').value;
      const role = document.getElementById('swal-input-role').value;
      if (!name || !email || !password || !role) {
        swal.showValidationMessage('Semua field harus diisi');
        return false;
      }
      return { name, email, password, role };
    }
  });

  if (!formValues) return;

  try {
    await $fetch(`${config.public.backend}/api/users`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formValues,
    });
    toast.success({message:"User berhasil dibuat"});
    fetchUsers();
  } catch (err) {
    console.error(err);
    toast.error({message:"Gagal membuat user."});
  }
};

const updateUserRole = async (user) => {
  const confirm = await swal.fire({
    icon: "question",
    title: `Pilih role baru untuk ${user.name}`,
    input: "select",
    inputOptions: {
      admin: "Admin",
      teacher: "Teacher",
      student: "Student",
    },
    inputPlaceholder: "Pilih role",
    showCancelButton: true,
    confirmButtonText: "Simpan",
    cancelButtonText: "Batal",
  });

  if (!confirm.isConfirmed || !confirm.value) return;

  try {
    await $fetch(`${config.public.backend}/api/users/${user.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: { role: confirm.value },
    });
    toast.success({message:"Role diupdate"});
    fetchUsers();
  } catch (err) {
    console.error(err);
    toast.error({message:"Gagal update role."});
  }
};

const deleteUser = async (user) => {
  const confirm = await swal.fire({
    icon: "warning",
    title: `Yakin hapus user ini? ${
      user.role == "teacher" ? "Kelas dan kuis milih guru ini akan ikut terhapus." : ""
    }`,
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
  if (!confirm.isConfirmed) return;

  try {
    await $fetch(`${config.public.backend}/api/users/${user.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    users.value = users.value.filter((u) => u.id !== user.id);
    swal.fire("Berhasil", "User dan seluruh data milik user ini berhasil dihapus", "success");
  } catch (err) {
    console.error(err);
    swal.fire("Gagal", "Tidak bisa hapus user", "error");
  }
};

definePageMeta({
  layout: "admin",
  middleware: "auth",
  role: "admin",
});

const columns = [
  { header: "Username", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Role", accessorKey: "role" },
];

const filters = [{ title: "Role", options: ["admin", "teacher", "student"], accessorKey: "role" }];
</script>

<template>
  <div class="p-4 pb-2">
    <h2 class="text-2xl font-semibold text-green-600 dark:text-green-500">Data User</h2>
    <div class="absolute top-0 right-0 mt-6 mr-6">
      <button
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          @click="createUser">
          Buat User Baru
      </button>
    </div>
  </div>
  <div class="overflow-x-auto max-w-full">
    <AdminTable
      :data="users"
      :columns="columns"
      :pageSize="10"
      :filters="filters"
      @refresh="fetchUsers"
      :onUpdate="updateUserRole"
      :onDelete="deleteUser" />
  </div>
</template>
