<template>
  <div class="view">
    <c-template-step>
      <template #title>Dados pessoais</template>
      <template #description
        >Preencha os dados para uma prévia mais fidedigna.</template
      >
      <template #body>
        <c-business-config></c-business-config>
      </template>
    </c-template-step>

    <c-template-step>
      <template #title>Seleção de seções</template>
      <template #description
        >Selecione as seções que você quer que o seu site possua. Na próxima
        etapa, você terá a chance de organizá-las a sua maneira.</template
      >
      <template #body>
        <c-section-list></c-section-list>
      </template>
    </c-template-step>

    <c-template-step>
      <template #title>Disposição das seções</template>
      <template #description
        >As seções do seu site serão organizadas da forma como são
        exibidas.</template
      >
      <template #body>
        <c-section-arrange></c-section-arrange>
      </template>
    </c-template-step>

    <c-finish></c-finish>
    <c-template-overlay v-if="overlay.isVisible">
      <template #title>{{ overlay.title }}</template>
      <template #body>{{ overlay.body }}</template>
    </c-template-overlay>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import CTemplateStep from "@/templates/step.vue";
import CBusinessConfig from "@/components/molecules/business-config.vue";
import CSectionList from "@/components/organisms/section-list.vue";
import CSectionArrange from "@/components/organisms/section-arrange.vue";
import CFinish from "@/components/organisms/finish.vue";

import CTemplateOverlay from "@/templates/overlay.vue";

export default {
  components: {
    CTemplateStep,
    CBusinessConfig,
    CSectionList,
    CSectionArrange,
    CFinish,

    CTemplateOverlay,
  },

  setup() {
    const store = useStore();

    return {
      overlay: computed(() => store.getters["overlay/get"]),
    };
  },
};
</script>

<style src="@/assets/root.css"></style>
<style scoped src="./main.css"></style>
