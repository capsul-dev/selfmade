<template>
  <div class="relative">
    <c-input v-model="clientName">Seu nome</c-input>
    <c-input v-model="clientMail">Seu e-mail</c-input>
    <c-input v-model="productName">Nome do produto</c-input>
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    clientName: {
      get() {
        return store.getters["business/clientName"];
      },
      set(value) {
        store.dispatch("business/updateClientName", value);
      },
    },
  },

  methods: {
    onImportClick() {
      this.$refs.file.click();
    },

    async onFileImported(event) {
      const content = await this.importJSON(event);
      console.log({ content });
    },

    importJSON(event) {
      return new Promise((resolve) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.readAsText(event.target.files[0]);
      });
    },
  },
};
</script>
