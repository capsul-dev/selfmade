<template>
  <div class="lg:px-5">
    <div class="my-5">Ao salvar você concorda com os nossos Termos de Uso.</div>
    <c-button
      :is-loading="store.getters['business/isLoading']"
      @click="exportJSON"
      >Salvar</c-button
    >
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  methods: {
    exportJSON() {
      this.store
        .dispatch("business/sendLayout")
        .then(() =>
          this.store.dispatch("modal/spawn", {
            title: "Sucesso",
            body: "Layout enviado para a equipe responsável",
          })
        )
        .catch((error) =>
          this.store.dispatch("modal/spawn", {
            title: "Erro",
            body: error?.message ? error.message : error,
          })
        );
    },
  },
};
</script>
