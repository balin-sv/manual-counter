import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/Login.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  console.log("in router");

  // if (!isAdmin && to.name == "admin") {
  //   notif.error("entra con sus credenciales");
  //   return { name: "login" };
  // }

  // if (!isUser.value && to.name == "profile") {
  //   notif.error("entra con sus credenciales");
  //   return { name: "login" };
  // }
});
export default router;
