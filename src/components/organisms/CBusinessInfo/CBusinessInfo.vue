<template>
  <div class="leading-8 opacity-80">
    <div>Nome: {{ store.getters["business/business"].clientName }}</div>
    <div>Email: {{ store.getters["business/business"].clientMail }}</div>
    <div>Telefone: {{ store.getters["business/business"].clientPhone }}</div>
    <div>Nome do produto: {{ store.getters["business/business"].productName }}</div>
    <div>Detalhes: {{ store.getters["business/business"].details }}</div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  setup() {
    return {
      store,
    };
  },
};
</script>
