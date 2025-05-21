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

const swal = useSwal();

const fetchUsers = async () => {
  try {
    users.value = await $fetch(`${config.public.backend}/api/users`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
  } catch (err) {
    console.error("Gagal ambil user", err);
  }
};

const updateUserRole = async (user) => {
  const confirm = await swal.fire({
    icon: "warning",
    title: `Ubah ${user.name} jadi ${user.role}?`,
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
  if (!confirm.isConfirmed) return;
  try {
    await $fetch(`${config.public.backend}/api/users/${user.id}`, {
      method: "PUT",
      body: { role: user.role },
    });
    swal.fire("Berhasil", "Role diupdate", "success");
  } catch (err) {
    console.error(err);
    swal.fire("Gagal", "Tidak bisa update", "error");
  }
};

const deleteUser = async (id) => {
  const confirm = await swal.fire({
    icon: "warning",
    title: "Yakin hapus user ini?",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
  if (!confirm.isConfirmed) return;

  try {
    await $fetch(`${config.public.backend}/api/users/${id}`, { method: "DELETE" });
    users.value = users.value.filter((u) => u.id !== id);
    swal.fire("Berhasil", "User dihapus", "success");
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
  { header: "#", accessorKey: "index", cell: { name: "IndexCell" } },
  { header: "Email", accessorKey: "email" },
  { header: "Username", accessorKey: "name" },
  {
    header: "Role",
    accessorKey: "role",
    cell: {
      name: "AdminRoleButton",
    },
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: {
      name: "AdminActionButton",
    },
  },
];
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold text-green-600">Data User</h2>
    <div class="overflow-x-auto max-w-full">
      <AdminTable :data="users" :columns="columns" :pageSize="10" />
    </div>
  </div>
</template>
