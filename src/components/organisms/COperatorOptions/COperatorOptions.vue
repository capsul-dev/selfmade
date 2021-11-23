<template>
  <div class="grid gap-y-2 md:grid-cols-2 md:gap-x-2 md:gap-y-0">
    <input ref="file" type="file" @change="onFileImported" hidden />
    <c-button @click="onImportClick">
      <i class="fa fa-file-import"></i>
      Importar
    </c-button>
    <c-button @click="onResetClick">Resetar</c-button>
  </div>
</template>

<script>
import store from "@/store";
import { CButton } from "@/components";
import { fromBase64 } from "../../../../isomorphic/services/encoding";

export default {
  components:{
    CButton,
  },
  setup() {
    return {
      store,
    };
  },

  methods: {
    onImportClick() {
      this.$refs.file.value = null;
      this.$refs.file.click();
    },

    onResetClick() {
      store.dispatch("business/reset");
      store.dispatch("layout/reset");
    },

    async onFileImported(event) {
      const content = await this.importJSON(event);
      const deserializedContent = fromBase64(content.serializedContent);
      const parsedContent = JSON.parse(deserializedContent);
      store.dispatch("business/import", parsedContent.business);
      store.dispatch("layout/import", parsedContent.sections);
    },

    importJSON(event) {
      return new Promise((resolve) => {
        const fr = new FileReader();
        fr.onload = () => {
          const content = JSON.parse(fr.result) || {};
          if (!content.serialized) {
            throw "JSON inválido";
          }

          resolve(content);
        };
        fr.readAsText(event.target.files[0]);
      });
    },
  },
};
</script>
