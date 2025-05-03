<template>
  <div class="rounded-sm shadow-lg border border-green-200 py-8">
    <div class="max-w-3xl mx-auto px-4">
      <div class="text-center mb-10 animate-fade-in">
        <div class="relative mb-4 inline-block" @click="updateProfilePic">
          <div
            v-if="userData.profile_pic != 'null'"
            class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
            <img
              :src="userData.profile_pic"
              alt="Profile Picture"
              class="w-full rounded-full h-full object-cover" />
          </div>
          <div
            v-else
            class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-4 border-white shadow-lg">
            <Icon name="mdi:account" size="64" class="text-gray-400" />
          </div>
        </div>

        <h1 class="text-2xl font-bold text-gray-800" @click="updateName">
          {{ userData.name || "User" }}
        </h1>
      </div>

      <div>
        <EditPassword  />
      </div>
    </div>
  </div>
</template>

<script setup>
import Cookies from "js-cookie";
import { useSwal } from "~/utils/swal";

const config = useRuntimeConfig();
const swal = useSwal();
const accessToken = Cookies.get("access_token");

const userData = ref({
  name: Cookies.get("username"),
  has_password: Cookies.get("has_password"),
  profile_pic: Cookies.get("profile_pic"),
});

const updateName = async () => {
  const { value: name } = await swal.fire({
    title: "Edit Name",
    input: "text",
    inputValue: userData.value.name,
    showCancelButton: true,
    confirmButtonText: "Update",
    inputValidator: (value) => !value && "Name cannot be empty",
  });

  if (name) {
    try {
      await $fetch(`${config.public.backend}/api/user/me`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: { name },
      });
      userData.value.name = name;
      swal.fire("Success", "Name updated!", "success");

      userData.value.name = name;
      Cookies.set("username", name);
    } catch (e) {
      swal.fire("Error", "Failed to update name.", "error");
    }
  }
};

// [PENDING | BELUM BERHASIL]
const updateProfilePic = async () => {
  const { value: file } = await swal.fire({
    title: "Update Profile Picture",
    input: "file",
    inputAttributes: { accept: "image/*" },
    showCancelButton: true,
    inputValidator: (f) => !f && "Please select an image",
  });

  if (file) {
    const formData = new FormData();
    formData.append("profile_pic", file);
    try {
      await $fetch(`${config.public.backend}/api/user/me`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      userData.value.profile_pic = URL.createObjectURL(file);
      swal.fire("Success", "Profile picture updated!", "success");
    } catch (e) {
      swal.fire("Error", "Failed to update profile picture.", "error");
    }
  }
};
</script>
