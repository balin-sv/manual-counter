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
    getUser() {
      return this.user;
    },
    logIn(payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://ikcount.com/iklab/api/login", {
            auth: "Y2xpY2tlcjIuZGVtbzpURVNULjIwMjIjOklLTEFCMDA1",
            privilegesDetail: true,
          })
          .then((result) => {
            if (result) {
              this.accessToken = result.data.access_token;
              console.log(this.accessToken);
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
    logOut() {
      return new Promise((resolve, reject) => {
        this.user = {};
        this.userToken = "";
        resolve(true);
      });
    },
  },
  persist: true,
});
