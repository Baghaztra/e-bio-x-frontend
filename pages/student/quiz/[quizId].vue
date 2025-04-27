<template>
  <QuizSubmission />
</template>

<script setup>
definePageMeta({
  layout: "blank",
});

onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
  window.addEventListener("popstate", handlePopState);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
  window.removeEventListener("popstate", handlePopState);
});

function handleBeforeUnload(e) {
  if (isSubmitting.value) {
    e.preventDefault();
    e.returnValue = "Apakah Anda yakin ingin meninggalkan halaman ini? Quiz sedang dikirim.";
  }
}

function handlePopState() {
  if (isSubmitting.value) {
    history.pushState(null, "", location.href);
  }
}
</script>
