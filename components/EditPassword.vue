<template>
  <div class="text-center">
    <button
      @click="openPasswordModal"
      :class="
        userData.has_password === 'true'
          ? 'bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500'
          : 'bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700'
      ">
      {{ userData.has_password === "true" ? "Change Password" : "Set Password" }}
    </button>
  </div>

  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
      <h2 class="text-lg font-bold mb-4">
        {{ isHasPassword ? "Change Password" : "Set Password" }}
      </h2>

      <div v-if="isHasPassword">
        <label class="text-sm">Current Password</label>
        <div class="relative mb-3">
          <input
            :type="showCurrent ? 'text' : 'password'"
            v-model="currentPass"
            class="w-full border p-2 rounded pr-10" />
          <Icon
            @click="showCurrent = !showCurrent"
            :name="showCurrent ? 'mdi:eye-off' : 'mdi:eye'"
            class="absolute right-3 top-3 cursor-pointer" />
        </div>
      </div>

      <label class="text-sm">New Password</label>
      <div class="relative mb-3">
        <input
          :type="showNew ? 'text' : 'password'"
          v-model="newPass"
          class="w-full border p-2 rounded pr-10" />
        <Icon
          @click="showNew = !showNew"
          :name="showNew ? 'mdi:eye-off' : 'mdi:eye'"
          class="absolute right-3 top-3 cursor-pointer" />
      </div>

      <label class="text-sm">Confirm Password</label>
      <div class="relative mb-3">
        <input
          :type="showConfirm ? 'text' : 'password'"
          v-model="confirmPass"
          class="w-full border p-2 rounded pr-10" />
        <Icon
          @click="showConfirm = !showConfirm"
          :name="showConfirm ? 'mdi:eye-off' : 'mdi:eye'"
          class="absolute right-3 top-3 cursor-pointer" />
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button @click="showModal = false" class="px-4 py-2 rounded bg-gray-300">Cancel</button>
        <button @click="submitPassword" class="px-4 py-2 rounded bg-green-600 text-white">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSwal } from "~/utils/swal";
import Cookies from "js-cookie";

const swal = useSwal();
const config = useRuntimeConfig();
const accessToken = Cookies.get("access_token");
const userData = ref({ has_password: Cookies.get("has_password") });

const showModal = ref(false);
const isHasPassword = ref(false);

const currentPass = ref("");
const newPass = ref("");
const confirmPass = ref("");

const showCurrent = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

const openPasswordModal = () => {
  isHasPassword.value = userData.value.has_password === "true";
  showModal.value = true;
};
const submitPassword = async () => {
  if (!newPass.value || !confirmPass.value) {
    swal.fire("Error", "New password & confirmation required", "error");
    return;
  }
  if (newPass.value !== confirmPass.value) {
    swal.fire("Error", "Passwords do not match", "error");
    return;
  }
  if (isHasPassword.value && !currentPass.value) {
    swal.fire("Error", "Current password required", "error");
    return;
  }

  try {
    await $fetch(`${config.public.backend}/api/user/me`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: isHasPassword.value
        ? { current_password: currentPass.value, new_password: newPass.value }
        : { new_password: newPass.value },
    });
    swal.fire("Success", "Password updated!", "success");
    userData.value.has_password = "true";
    Cookies.set("has_password", "true");
    showModal.value = false;
  } catch (e) {
    if (e.response && e.response.status === 400) {
      swal.fire("Error", "Password salah", "error");
    } else {
      swal.fire("Error", "Failed to update password.", "error");
    }
  }
};
</script>
