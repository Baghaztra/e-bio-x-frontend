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
              <div class="mb-3">
                <label for="userType" class="form-label">Login Sebagai</label>
                <select class="form-select" id="userType" v-model="userType" required>
                  <option value="student">Siswa</option>
                  <option value="teacher">Guru</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" class="btn btn-success w-100">Login</button>
            </form>
            <!-- baru -->
            <button @click="loginWithGoogle" class="btn btn-primary w-100">Login dengan Google</button> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp, useRouter } from '#app'
const { $gAuth } = useNuxtApp()
const router = useRouter()

definePageMeta({
  layout: "blank",
});

const email = ref('bla@bla')
const password = ref('1')
const userType = ref('student')

const handleLogin = () => {
  // TODO: Implement login logic when backend is ready
  router.replace(`/${userType.value}`);

  console.log('Login attempt:', {
    email: email.value,
    password: password.value,
    userType: userType.value
  })
}
</script> 