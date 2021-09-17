<template>
  <div class="list">
    <c-checkbox
      v-for="(section, index) in sections"
      v-model:checked="section.enabled"
      :key="`section-${index}`"
      :required="section.required"
    >
      <div class="checkbox_name">
        {{ section.name }}
        <small>{{ !!section.required ? "(obrigatório)" : "" }}</small>
      </div>
      <div class="checkbox_description">
        {{ section.description }}
      </div>
    </c-checkbox>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CCheckbox from "@/components/atoms/checkbox.vue";

export default {
  components: {
    CCheckbox,
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

<style scoped src="./section-list.css"></style>
