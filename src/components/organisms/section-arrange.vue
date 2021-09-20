<template>
  <draggable
    class="grid gap-y-4"
    handle=".handle"
    v-model="sections"
    tag="transition-group"
    item-key="order"
    :component-data="{ tag: 'div', name: 'drag', type: 'transition' }"
    ghost-class="ghost"
  >
    <template #item="{ element }">
      <c-section
        :order="element.order"
        @moveUp="onMoveUp(element)"
        @moveDown="onMoveDown(element)"
      >
        <template #info>
          <div
            :class="`
              handle font-bold text-lg p-2
              ${
                typeof element.originalOrder !== 'number'
                  ? 'cursor-move'
                  : 'cursor-not-allowed'
              }
            `"
          >
            {{ element.name }}
          </div>
        </template>
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

  methods: {
    onMoveUp(section) {
      store.dispatch("layout/moveUp", section);
    },
    onMoveDown(section) {
      store.dispatch("layout/moveDown", section);
    },
  },

  computed: {
    sections: {
      get() {
        return store.getters["layout/sections"]
          .filter((section) => !!section.enabled)
          .sort((a, b) => (a.order > b.order ? 1 : -1));
      },
      set(value) {
        store.dispatch("layout/updateOrder", value);
      },
    },
  },
};
</script>
