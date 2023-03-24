<template>
  <div class="d-flex">
    <Loading v-if="!counter" />
    <div v-if="counter" class="custom-box">
      <span>{{ counter }}</span>
    </div>
    <button v-if="counter" class="btn btn-custom btn-success" @click="add">
      <span>+</span>
    </button>
    <button v-if="counter" class="btn btn-log-out btn-danger" @click="exit">
      <span>Exit</span>
    </button>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Loading from "@/components/Loading.vue";
import { useSocketIO } from "@/socket";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "vue-router";

const { socket } = useSocketIO();

const authStore = useAuthStore();
const router = useRouter();

const counter = ref(null);

onMounted(() => {
  socket.on("welcome", (e) => {
    counter.value = e.current_aforo;
  });
});

socket.on("heartbeat", (e) => {
  counter.value = e.current_aforo;
});

const add = () => {
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

const exit = async () => {
  const res = await authStore.logOut();
  res ? router.push("/login") : console.log("fail");
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

.btn-custom {
  margin-top: 15vh;
  margin-left: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 50px;
  font-weight: 500;
  color: rgb(56, 49, 49);
}
.btn-log-out {
  margin-top: 15vh;
  margin-left: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 30px;
  font-weight: 500;
  color: rgb(56, 49, 49);
}
</style>
