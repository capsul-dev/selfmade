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
        :element="element"
      >
        <template #info>
          <div
            :class="`
           font-bold text-lg p-2
              ${
                typeof element.originalOrder !== 'number' &&
                !store.getters['business/isAdmin']
                  ? 'handle cursor-move'
                  : 'cursor-not-allowed'
              }
            `"
          >
            {{ element.name }}
          </div>
        </template>
      </c-section>
    </template>
  </draggable>
</template>

<script>
import Draggable from "vuedraggable";

import CSection from "@/components/molecules/section.vue";
import store from "@/store";

export default {
  components: {
    Draggable,
    CSection,
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

  setup() {
    return {
      store,
    };
  },
};
</script>

<style scoped>
.ghost {
  opacity: 0.5;
}
</style>
