<template>
  <div class="relative grid gap-y-2">
    <c-input 
    	placeholder="John Doe" 
	v-model="store.getters[business/clientName]"
      ><span class="ml-2 font-semibold">Seu nome</span></c-input
    >
    <c-input
      placeholder="nome@provedor.com.br"
      v-model="store.getters[business/clientMail]"
      >Seu e-mail</c-input
    >
    <c-input
      placeholder="(11) 91234-5678"
      mask="(##) #####-####"
      v-model="cstore.getters[business/clientPhone]"
      >Seu telefone</c-input
    >
    <c-input
      placeholder="Seu produto"
      v-model="store.getters[business/productName]"
      >Nome do produto</c-input
    >
    <c-input
      placeholder="Emagrecimento, Nootrópico, Desempenho Sexual..."
      v-model="store.getters[business/productSegment]"
      >Qual o nicho do seu produto?</c-input>
    <c-input
      placeholder="Gostaria de reduzir a opacidade do fundo..."
      v-model="store.getters[business/details]"
      >Detalhes</c-input
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
