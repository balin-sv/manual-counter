import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "",
    email: "",
    userName: "",
  }),

  getters: {
    getUserToken: (state) => {
      return () => state.accessToken;
    },
    getUserEmail: (state) => {
      return () => state.email;
    },
    getUserName: (state) => {
      return () => state.userName;
    },
  },

  actions: {
    logIn(codeString) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://ikcount.com/iklab/api/login", {
            auth: codeString,
            privilegesDetail: true,
          })
          .then((result) => {
            if (result) {
              this.accessToken = result.data.access_token;
              this.email = result.data.email;
              this.userName = result.data.username;
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((error) => {
            resolve(false);
            reject(error);
          });
      });
    },
  },
  persist: true,
});
