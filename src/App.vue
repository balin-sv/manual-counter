<template>
  <MainLayout> <router-view /></MainLayout>
</template>

<script setup>
import { RouterView } from "vue-router";
import MainLayout from "@/components/layouts/MainLayout.vue";
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
