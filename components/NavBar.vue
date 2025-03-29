<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-a">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/">E-Bio-X</NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from "#app";
import Cookies from "js-cookie";

const router = useRouter();

const handleLogout = () => {
  Cookies.remove("access_token");
  Cookies.remove("email");
  Cookies.remove("username");
  Cookies.remove("role");
  Cookies.remove("picture");

  router.replace("/login");
};
</script>
