<template>
  <div class="lg:px-5">
    
    <c-input
      placeholder="Gostaria de reduzir a opacidade do fundo..."
      v-model="store.state.business.details"
      >Observações</c-input>

    <div class="my-5">Ao salvar você concorda com os nossos Termos de Uso.</div>
    <div id="h-captcha"></div>
    <c-button
      :is-loading="store.getters['business/isLoading']"
      @click="exportJSON"
      >Salvar</c-button
    >
  </div>
</template>

<script>
import { useStore } from "vuex";
const { HCAPTCHA_SITEKEY } = process.env;

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },

  methods: {
    exportJSON() {
      if ("hcaptcha" in window && !("hcaptcha_widgetID" in window)) {
        window.hcaptcha_widgetID = window.hcaptcha.render("h-captcha", {
          size: "invisible",
          sitekey: HCAPTCHA_SITEKEY,
        });
      }

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
