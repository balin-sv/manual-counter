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

