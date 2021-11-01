<template>
  <div
    class="
      relative
      w-full
      min-h-screen
      lg:px-40
      xl:px-
      py-4
      grid
      gap-y-5
      dark:bg-gray-900 dark:text-white
    "
  >
    <c-logo source="img/logo/logo.png" class="pl-5 pt-3" />
    <c-template-step v-if="!store.getters['business/isAdmin']">
      <template #title>Dados pessoais</template>
      <template #description
        >Preencha com
        <span class="font-medium">suas informações</span> pessoais.</template
      >
      <template #body>
        <c-business-config></c-business-config>
      </template>
    </c-template-step>

    <c-template-step v-else>
      <template #title>Opções do operador</template>
      <template #body>
        <c-operator-options></c-operator-options>
      </template>
    </c-template-step>

    <c-template-step v-if="!store.getters['business/isAdmin']">
      <template #title>Escolha suas seções</template>
      <template #description
        >Nesta área, você irá
        <span class="font-medium">escolher as seções</span> que deseja em seu
        site. Caso queira saber mais sobre cada uma,
        <span class="font-bold">clique no ícone</span> "
        <i class="fa fa-video text-green-500"></i> " e assista a um vídeo que
        preparamos para você!</template
      >
      <template #body>
        <c-section-list></c-section-list>
      </template>
    </c-template-step>

    <c-template-step v-else-if="!!store.getters['business/isImported']">
      <template #title>Dados do cliente</template>
      <template #body>
        <c-business-info></c-business-info>
      </template>
    </c-template-step>

    <c-template-step
      v-if="
        !store.getters['business/isAdmin'] ||
        !!store.getters['business/isImported']
      "
    >
      <template #title>Disposição das seções</template>
      <template #description>
        Clique nas setas laterais para mudar o estilo de cada seção e use as
        setas na barra superior para mudar a posição, ou caso prefira, arraste a
        barra.
      </template>
      <template #body>
        <c-section-arrange></c-section-arrange>
      </template>
    </c-template-step>

    <c-template-step v-if="!store.getters['business/isAdmin']">
      <template #body>
        <c-finish></c-finish>
      </template>
    </c-template-step>

    <c-template-modal v-if="modal.isVisible">
      <template #title>{{ modal.title }}</template>
      <template #body>
        <div v-if="modal.body.length > 0" class="opacity-80 mb-5">
          {{ modal.body }}
        </div>
        <component
          v-if="modal.component.length > 0"
          :is="modal.component"
          :details="modal.details"
        ></component>
      </template>
    </c-template-modal>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import {
  CTemplateStep,
  COperatorOptions,
  CBusinessInfo,
  CBusinessConfig,
  CSectionList,
  CSectionArrange,
  CFinish,
  CVideo,
  CTemplateModal,
  CLogo,
} from "@/components";

export default {
  components: {
    CTemplateStep,
    COperatorOptions,
    CBusinessInfo,
    CBusinessConfig,
    CSectionList,
    CSectionArrange,
    CFinish,
    CVideo,
    CLogo,
    CTemplateModal,
  },

  setup() {
    const store = useStore();

    onMounted(() => {
      const params = new URLSearchParams(window.location.search);
      store.dispatch("business/setAdmin", params.has("admin") && params.get("admin") === "true");

      if (!store.getters["business/isAdmin"]) {
        store.dispatch("layout/initOrder");
      }
    });

    return {
      store,
      modal: computed(() => store.getters["modal/get"]),
    };
  },
};
</script>

<style src="@/assets/tailwind.css"></style>
