<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-a text-white text-center">
            <h4>Login</h4>
          </div>
          <div class="card-body">
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
import Cookies from "js-cookie";
const router = useRouter();
const config = useRuntimeConfig();

definePageMeta({
  layout: "blank",
});

import { GoogleSignInButton, type CredentialResponse } from "vue3-google-signin";

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
  const { credential } = response;

  if (!credential) {
    console.error("Login failed, credential not found");
    return;
  }
  const { data, error } = await useAsyncData("googleLogin", () =>
    $fetch(`${config.public.BACKEND_URL}/api/google-login`, {
      method: "POST",
      body: { token: credential },
    })
  );

  if (error.value) {
    console.error("Login error:", error.value);
  } else {
    const user = data.value;
    console.log("Login success:", user);
    
    Cookies.set("access_token", user.access_token, { expires: 1, path: "/" });
    Cookies.set("email", user.email, { expires: 1, path: "/" });
    Cookies.set("username", user.username, { expires: 1, path: "/" });
    Cookies.set("role", user.role, { expires: 1, path: "/" });
    Cookies.set("picture", user.picture, { expires: 1, path: "/" });

    router.replace(`/${user.role}`);
  }
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>
