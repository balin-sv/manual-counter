import { reactive } from "vue";
import { io } from "socket.io-client";
import { useAuthStore } from "./stores/auth-store";
const authStore = useAuthStore();

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

const URL = `https://ikcount.com/live?atoken=${authStore.getUserToken()}`;

export const socket = io(URL);

socket.on("connect", () => {
  console.log("Connected to socket.io server");
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("summary", (...args) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});
