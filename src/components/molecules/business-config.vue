<template>
  <div class="config">
    <c-input class="config__input" v-model="businessName"></c-input>
    <div class="config__right">
      <input type="file" ref="file" @change="onFileImported" hidden />
      <c-button class="config__save-btn" @click="onImportClick"
        >Importar</c-button
      >
    </div>
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

  methods: {
    onImportClick() {
      this.$refs.file.click()
    },

    async onFileImported(event) {
      const content = await this.importJSON(event)
      console.log({ content })
    },

    importJSON(event) {
      return new Promise((resolve) => {
        const fr = new FileReader()
        fr.onload = () => resolve(fr.result)
        fr.readAsText(event.target.files[0])
      })
    },
  },
};
</script>

<style scoped src="./business-config.css"></style>
