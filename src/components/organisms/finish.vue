<template>
  <div class="border-2 p-4">
    <div class="finish__left">Blah</div>
    <div class="finish__right">
      <div class="finish__right__disclaimer">
        Ao salvar você concorda com os nossos Termos de Uso.
      </div>
      <c-button classes="confirm" @click="exportJSON">Salvar</c-button>
    </div>
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
          this.store.dispatch("overlay/spawn", {
            title: "Sucesso",
            body: "Layout enviado para a equipe responsável",
          })
        )
        .catch((error) =>
          this.store.dispatch("overlay/spawn", {
            title: "Erro",
            body: error,
          })
        );
    },
  },
};
</script>
