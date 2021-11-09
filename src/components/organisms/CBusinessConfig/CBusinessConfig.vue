<template>
  <div class="relative grid gap-y-2">
    <c-input
      role="clientName"
      placeholder="John Doe"
      v-model="store.getters['business/business'].businessInfo.clientName"      
      ><span class="ml-2 font-semibold">Seu nome</span></c-input
    >
    <c-input
      role="clientMail"
      placeholder="nome@provedor.com.br"
      v-model="store.getters['business/business'].businessInfo.clientMail"
      >Seu e-mail</c-input
    >
    <c-input
      role="clientPhone"
      placeholder="(11) 91234-5678"
      mask="(##) #####-####"
      v-model="store.getters['business/business'].businessInfo.clientPhone"
      >Seu telefone</c-input
    >
    <c-input
      role="productName"
      placeholder="Seu produto"
      v-model="store.getters['business/business'].businessInfo.productName"
      >Nome do produto</c-input
    >
    <c-input
      role="productSegment"
      placeholder="Emagrecimento, Nootrópico, Desempenho Sexual..."
      v-model="store.getters['business/business'].businessInfo.productSegment"
      >Qual o nicho do seu produto?</c-input
    >
  </div>
</template>

<script>
import store from "@/store";
import { CInput } from "@/components";

export default {
  components: {
    CInput
  },
  setup() {
    return {
      store,
    };
  },
};
</script>
