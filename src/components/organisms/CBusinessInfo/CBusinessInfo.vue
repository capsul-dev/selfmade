<template>
  <div>
    <div>Nome: {{ store.getters["business/clientName"] }}</div>
    <div>Email: {{ store.getters["business/clientMail"] }}</div>
    <div>Telefone: {{ store.getters["business/clientPhone"] }}</div>
    <div>Nome do produto: {{ store.getters["business/productName"] }}</div>
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
