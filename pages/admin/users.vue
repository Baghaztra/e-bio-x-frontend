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
