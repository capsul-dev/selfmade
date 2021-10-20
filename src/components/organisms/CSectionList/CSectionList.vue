<template>
  <c-message v-if="selectedCount < requiredMin">
    <i class="fa fa-warning" />
    Você precisa escolher mais {{ requiredMin - selectedCount }}.
  </c-message
  >
  <div class="grid lg:grid-cols-2 gap-y-2 lg:gap-x-4">
    <c-checkbox
      v-for="(section, index) in sections"
      v-model:checked="section.enabled"
      :key="`section-${index}`"
      :required="section.required"
      @valueChanged="store.dispatch('layout/initOrder')"
    >
      <div class="flex">
        <div class="flex-1">
          <div class="font-semibold uppercase my-2">
            {{ section.name }}
            <span class="text-red-600">{{
              !!section.required ? "*" : ""
            }}</span>
          </div>
        </div>

        <div
          class="self-center text-green-500 ml-5 z-9"
          @click="
            $event.stopPropagation();
            spawnVideoModal(section);
          "
        >
          <i class="fa fa-video"></i>
        </div>
      </div>
    </c-checkbox>
  </div>
  <div class="font-light text-right opacity-80 text-x1 my-2">
    <small class="font-bold text-red-600">*</small> Obrigatório
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CCheckbox from "@/components/atoms/CCheckbox/CCheckbox.vue";
import CMessage from "@/components/atoms/CMessage/CMessage.vue";

import store from "@/store";

export default {
  components: {
    CCheckbox,
    CMessage,
  },

  methods: {
    spawnVideoModal(section) {
      store.dispatch("modal/spawn", {
        title: section.name,
        body: "fdfdasfa",
        component: "c-video",
        details: {
          id: "blabla",
        },
      });
    },
  },

  setup() {
    const store = useStore();

    return {
      store,
      sections: computed(() =>
        store.state.layout.sections
          .slice(0)
          .reverse()
          .sort((a) => (a.required ? 1 : -1))
      ),
      selectedCount: computed(() => store.getters['layout/selectedCount']),
      requiredMin: computed(() => store.state.layout.requiredMin),
    };
  },
};
</script>
