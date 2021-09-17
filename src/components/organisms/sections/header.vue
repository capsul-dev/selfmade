<template>
  <div class="header">
    <div class="header__title">{{ businessName }}</div>
    <div class="header__subtitle">Lorem ipsum dolor sit amet</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    return {
      businessName: computed(() => store.getters["business/name"]),
    };
  },
};
</script>

<style scoped src="./header.css"></style>
