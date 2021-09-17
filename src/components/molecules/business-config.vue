<template>
  <div class="config">
    <c-input v-model="businessName"></c-input>
    <c-button class="config__save-btn">Atualizar</c-button>
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    businessName: {
      get() {
        return store.getters["business/name"];
      },
      set(value) {
        store.dispatch("business/updateName", value);
      },
    },
  },
};
</script>

<style scoped src="./business-config.css"></style>
