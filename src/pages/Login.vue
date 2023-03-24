<template>
  <Form :formModel="formModel" @submit="submit" />
</template>
<script setup>
import Form from "@/components/Form.vue";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth-store.js";
import { useRouter } from "vue-router";
import { useNotyf } from "@/composable/useNotyf";

const authStore = useAuthStore();
const router = useRouter();
const notyf = useNotyf();

const formModel = ref({
  email: {
    tag: "input",
    type: "text",
    placeholder: "Ingrese su email",
    label: "Email",
    value: null,
    rules: {
      pattern: {
        value: /^(?!\s*$).+/,
        message: "Ingrese un nombre válido",
      },
    },
    errorMsg: null,
    isPayload: true,
  },
  password: {
    tag: "input",
    type: "password",
    placeholder: "Ingrese su contraseña",
    label: "Password",
    value: null,
    rules: {
      pattern: {
        value: /^(?!\s*$).+/,
        message: "Ingrese una contraseña válida",
      },
    },
    errorMsg: null,
    isPayload: true,
  },
});

const submit = async (email, password) => {
  const codeString = btoa(`${email}:${password}:IKLAB005`);
  const res = await authStore.logIn(codeString);
  if (res) {
    router.push("/");
    notyf.success("Felicidades, has iniciado sesión!");
  } else {
    notyf.error("Error en autenticación!");
  }
};
</script>
