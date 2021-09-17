<template>
  <draggable
    class="grid"
    v-model="sections"
    tag="transition-group"
    item-key="order"
    :component-data="{ tag: 'div', name: 'drag', type: 'transition' }"
    ghost-class="ghost"
  >
    <template #item="{ element }">
      <c-section :order="element.order">
        <template #title>{{ element.name }}</template>
        <template #template>
          <component :is="element.component"></component>
        </template>
      </c-section>
    </template>
  </draggable>
</template>

<script>
import { defineAsyncComponent } from "vue";
import Draggable from "vuedraggable";

import CSection from "@/components/molecules/section.vue";
import store from "@/store";

const sectionComponents = store.getters["layout/sections"].reduce(
  (a, c) => ({
    ...a,
    [c.component]: defineAsyncComponent(() =>
      import(`@/components/organisms/sections/${c.filename}.vue`)
    ),
  }),
  {}
);

export default {
  components: {
    Draggable,
    CSection,
    ...sectionComponents,
  },

  computed: {
    sections: {
      get() {
        return store.getters["layout/sections"]
          .filter((section) => !!section.enabled)
          .sort((a, b) => (a.originalOrder > b.originalOrder ? 1 : -1));
      },
      set(value) {
        store.dispatch("layout/updateOrder", value);
      },
    },
  },
};
</script>

<style scoped src="./section-arrange.css"></style>
