<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-a text-white text-center">
            <h4>Login</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-success w-100">Login</button>
            </form>
            <p v-if="message" class="alert alert-danger">{{ message }}</p>
            <center>
              <GoogleSignInButton
                @success="handleLoginSuccess"
                @error="handleLoginError"
                class="my-3" />
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig, useRouter } from "#app";
import { GoogleSignInButton, type CredentialResponse } from "vue3-google-signin";
import Cookies from "js-cookie";
const router = useRouter();
const config = useRuntimeConfig();

definePageMeta({
  layout: "blank",
});

const email = ref('')
const password = ref('')
const message = ref('')

// handle normal login
const handleLogin = async () => {
  const { data, error } = await useAsyncData("login", () =>
    $fetch(`${config.public.backend}/api/login`, {
      method: "POST",
      body: { 
        email: email.value, 
        password: password.value
      },
    })
  );

  if (error.value) {
    console.error("Login error:", error.value);
    message.value = error.value.message || "Terjadi kesalahan saat login";
  } else {
    const user = data.value as any;
    
    Cookies.set("access_token", user.access_token, { expires: 1, path: "/" });
    Cookies.set("email", user.email, { expires: 1, path: "/" });
    Cookies.set("username", user.username, { expires: 1, path: "/" });
    Cookies.set("role", user.role, { expires: 1, path: "/" });
    Cookies.set("picture", user.picture, { expires: 1, path: "/" });

    router.replace(`/${user.role}`);
  }
}

// handle success google login
const handleLoginSuccess = async (response: CredentialResponse) => {
  const { credential } = response;

  if (!credential) {
    console.error("Login failed, credential not found");
    return;
  }
  const { data, error } = await useAsyncData("googleLogin", () =>
    $fetch(`${config.public.backend}/api/google-login`, {
      method: "POST",
      body: { token: credential },
    })
  );

  if (error.value) {
    console.error("Login error:", error.value);
  } else {
    const user = data.value;
    
    Cookies.set("access_token", user.access_token, { expires: 1, path: "/" });
    Cookies.set("email", user.email, { expires: 1, path: "/" });
    Cookies.set("username", user.username, { expires: 1, path: "/" });
    Cookies.set("role", user.role, { expires: 1, path: "/" });
    Cookies.set("picture", user.picture, { expires: 1, path: "/" });

    router.replace(`/${user.role}`);
  }
};

// handle an error google login
const handleLoginError = () => {
  console.error("Login failed");
};
</script>
