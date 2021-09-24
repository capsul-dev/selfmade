<template>
  <div class="relative grid gap-y-2">
    <c-input placeholder="John Doe" v-model="store.state.business.clientName"
      ><span class="ml-2 font-semibold">Seu nome</span></c-input
    >
    <c-input
      placeholder="nome@provedor.com.br"
      v-model="store.state.business.clientMail"
      ><span class="ml-2 font-semibold">Seu e-mail</span></c-input
    >
    <c-input
      placeholder="(11) 91234-5678"
      mask="(##) #####-####"
      v-model="store.state.business.clientPhone"
      ><span class="ml-2 font-semibold">Seu telefone</span></c-input
    >
    <c-input
      placeholder="Seu produto"
      v-model="store.state.business.productName"
      ><span class="ml-2 font-semibold">Nome do produto</span></c-input
    >
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
