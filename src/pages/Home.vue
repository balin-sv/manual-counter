<template>
  <div>
    <h1>Home</h1>
    <button @click="test">+</button>
  </div>
  <ConnectionState />
</template>
<script setup>
import ConnectionState from "@/components/ConnectionState.vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth-store";
const authStore = useAuthStore();

const test = () => {
  console.log("+1");
  console.log(authStore.getUserToken());

  https: axios
    .post(
      `https://ikcount.com/iklab/ikcount/api/livecommand?atoken=${authStore.getUserToken()}`,
      {
        type: "manual-add",
        quantity: 1,
        client: "DEMO001",
        location: "DEMO001A1L1",
        macaddress: "DEMO001A1L1Z1MC2",
        username: "Y2xpY2tlcjIuZGVtbw==",
        email: "Y2xpY2tlcjIuZGVtby5pa2NvdW50QGlrbGFiLmNs",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((result) => {
      if (result) {
        console.log(result.data);
      } else {
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
