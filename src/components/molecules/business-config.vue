<template>
  <div class="flex gap-x-2">
    <c-input class="flex-1" v-model="businessName"></c-input>
    <div>
      <input type="file" ref="file" @change="onFileImported" hidden />
      <c-button class="w-40" @click="onImportClick">Importar</c-button>
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
