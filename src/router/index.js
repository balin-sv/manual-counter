import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth-store";

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
  const authStore = useAuthStore();
  if (!authStore.getUserToken() && to.name == "home") {
    return { name: "login" };
  }
  if (authStore.getUserToken() && to.name == "login") {
    return { name: "home" };
  }
});
export default router;
