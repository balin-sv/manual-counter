<template>
  <div class="d-flex">
    <div class="custom-box">
      <span>{{ counter }}</span>
    </div>
    <button class="btn btn-success" @click="test"><span>+</span></button>
  </div>
</template>
<script setup>
import { useSocketIO } from "@/socket";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth-store";
const authStore = useAuthStore();
const counter = ref(null);

const { socket } = useSocketIO();

socket.on("welcome", (e) => {
  console.log(e);
  counter.value = e.current_aforo;
});

const test = () => {
  console.log(authStore.getUserToken());
  axios
    .post(
      `https://ikcount.com/iklab/ikcount/api/livecommand?atoken=${authStore.getUserToken()}`,
      {
        type: "manual-add",
        quantity: 1,
        client: "DEMO001",
        location: "DEMO001A1L1",
        macaddress: "DEMO001A1L1Z1MC2",
        username: btoa(authStore.getUserName()),
        email: btoa(authStore.getUserEmail()),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((result) => {
      if (result) {
        socket.on("raw", (e) => {
          counter.value = e.current_aforo;
        });
      } else {
        console.log("error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
<style scoped>
.custom-box {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  width: 400px;
  height: 400px;
  background-color: rgb(195, 227, 131);
  border-radius: 50%;
}

.custom-box span {
  display: block;
  margin-top: 25%;
  font-size: 100px;
  font-weight: 500;
  color: rgb(56, 49, 49);
}

.btn {
  margin-top: 15vh;
  margin-left: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 50px;
  font-weight: 500;
  color: rgb(56, 49, 49);
}
</style>
