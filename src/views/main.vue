<template>
  <div class="relative w-full lg:px-40 grid gap-y-5">
    <c-template-step v-if="!store.getters['business/isAdmin']">
      <template #title>Dados pessoais</template>
      <template #description
        >Preencha os dados para uma prévia mais fidedigna.</template
      >
      <template #body>
        <c-business-config></c-business-config>
      </template>
    </c-template-step>

    <c-template-step v-else>
      <template #title>Opções do operador</template>
      <template #description>Opções</template>

      <template #body>
        <c-operator-options></c-operator-options>
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

    <c-template-step>
      <template #body>
        <c-finish></c-finish>
      </template>
    </c-template-step>

    <c-template-modal v-if="modal.isVisible">
      <template #title>{{ modal.title }}</template>
      <template #body>{{ modal.body }}</template>
    </c-template-modal>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

import CTemplateStep from "@/templates/step.vue";
import COperatorOptions from "@/components/organisms/operator-options.vue";
import CBusinessConfig from "@/components/organisms/business-config.vue";
import CSectionList from "@/components/organisms/section-list.vue";
import CSectionArrange from "@/components/organisms/section-arrange.vue";
import CFinish from "@/components/organisms/finish.vue";

import CTemplateModal from "@/templates/modal.vue";

export default {
  components: {
    CTemplateStep,
    COperatorOptions,
    CBusinessConfig,
    CSectionList,
    CSectionArrange,
    CFinish,

    CTemplateModal,
  },

  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("business/setAdmin", window.location.hash === "#admin");
    });

    return {
      store,
      modal: computed(() => store.getters["modal/get"]),
    };
  },
};
</script>

<style src="@/assets/tailwind.css"></style>
