<template>
  <form @submit.prevent="onSubmitHandler">
    <div class="form-group row w-50 m-auto">
      <div v-for="(field, name, i) in formData" class="mb-3">
        <label :key="i">{{ field.label }}</label>
        <component
          :key="i"
          :id="i"
          :is="field.tag"
          :type="field.type"
          :value="field.value"
          @input="field.value = $event.target.value"
          :placeholder="field.placeholder"
          :name="field.name"
          :class="[
            'form-control m-auto',
            field.errorMsg
              ? 'is-invalid'
              : field.value && !field.errorMsg
              ? 'is-valid'
              : '',
          ]"
        />
        <small class="text-danger">{{ field.errorMsg }}</small>
      </div>
      <div class="mb-1 mt-5">
        <button
          type="submit"
          :class="[
            'btn',
            isFormChecked ? 'btn-success' : 'btn-secondary disabled',
          ]"
        >
          {{ !isFormChecked ? "Llena los campos" : "Log in" }}
        </button>
      </div>
    </div>
  </form>
</template>
<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  formModel: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["submit"]);
const formData = computed(() => props.formModel);

watch(
  () => formData.value,
  (newVal, prevVal) => {
    for (const key in newVal) {
      if (newVal[key].value == null) {
        continue;
      } else if (newVal[key].value && newVal.rules !== null) {
        !newVal[key].rules.pattern.value.test(newVal[key].value)
          ? (formData.value[key].errorMsg =
              formData.value[key].rules.pattern.message)
          : (formData.value[key].errorMsg = null);
      } else {
        formData.value[key].errorMsg = null;
      }
    }
  },
  { deep: true }
);

const isFormChecked = computed(() => {
  let res;
  if (formData.value == null) {
    res = false;
  } else {
    let count = 0;
    for (const key in formData.value) {
      if (!formData.value[key].errorMsg && formData.value[key].value) {
        count++;
      }
    }
    count == Object.keys(formData.value).length ? (res = true) : (res = false);
  }
  return res;
});

const onSubmitHandler = async () => {
  const payload = {};
  for (const key in formData.value) {
    formData.value[key].isPayload
      ? (payload[key] = formData.value[key].value)
      : null;
  }
  emit("submit", payload.email, payload.password);
};
</script>
