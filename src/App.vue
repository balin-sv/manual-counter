<template>
  <Suspense timeout="0" v-if="!error">
    <template #default>
      <MainLayout> <router-view /></MainLayout>
    </template>
    <template #fallback> <p>loading</p> </template>
  </Suspense>
  <div v-else><p>error</p></div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { ref, onErrorCaptured } from "vue";
import MainLayout from "@/components/layouts/MainLayout.vue";

const error = ref(null);

onErrorCaptured((err) => {
  error.value = err;
  console.log(error.value);
});
</script>

<style scoped>
.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: beige;
}
</style>
