import { reactive } from "vue";
import { io } from "socket.io-client";
import { useAuthStore } from "./stores/auth-store";
const authStore = useAuthStore();

export const useSocketIO = () => {
  const socket = io(
    `https://ikcount.com/live?atoken=${authStore.getUserToken()}`
  );
  return {
    socket,
  };
};

// export const state = reactive({
//   connected: false,
// });

// const URL = `https://ikcount.com/live?atoken=${authStore.getUserToken()}`;

// export const socket = io(URL, {
//   autoConnect: false,
// });

// socket.on("connect", () => {
//   console.log("Connected to socket.io server");
//   state.connected = true;
// });
