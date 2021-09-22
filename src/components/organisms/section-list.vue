<template>
  <div class="grid lg:grid-cols-2 gap-y-2 lg:gap-x-4">
    <c-checkbox
      v-for="(section, index) in sections"
      v-model:checked="section.enabled"
      :key="`section-${index}`"
      :required="section.required"
    >
      <div class="flex">
        <div class="flex-1">
          <div class="font-bold mb-2">
            {{ section.name }}
            <small>{{ !!section.required ? "(obrigatório)" : "" }}</small>
          </div>
          <div class="opacity-80">
            {{ section.description }}
          </div>
        </div>

        <div
          class="self-center text-purple-400 ml-5 z-9"
          @click="$event.stopPropagation(); spawnVideoModal(section)"
        >
          <i class="fa fa-video"></i>
        </div>
      </div>
    </c-checkbox>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CCheckbox from "@/components/atoms/checkbox.vue";

import store from "@/store";

export default {
  components: {
    CCheckbox,
  },

  methods: {
    spawnVideoModal(section) {
      store.dispatch("modal/spawn", {
        title: section.name,
        body: "fdfdasfa",
        component: 'c-video',
        details: {
          id: 'blabla'
        }
      });
    },
  },

  setup() {
    const store = useStore();

    return {
      sections: computed(() =>
        store.getters["layout/sections"]
          .slice(0)
          .sort((a) => (a.required ? 1 : -1))
      ),
    };
  },
};
</script>
