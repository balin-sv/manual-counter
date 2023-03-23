import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "",
  }),

  actions: {
    getUserToken() {
      return this.accessToken;
    },
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
