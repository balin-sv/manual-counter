<template>
  <form class="container" @submit.prevent="login">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
      <div id="emailHelp" class="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth-store.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const password = ref("");
const email = ref("");

const login = async () => {
  console.log(email.value, password.value);
  const res = await authStore.logIn(email.value, password.value);
  res ? router.push("/") : console.log("fail");
};
</script>
