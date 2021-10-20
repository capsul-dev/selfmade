<template>
  <div class="relative rounded-lg bg-white shadow-lg dark:bg-gray-800">
    <div
      class="
        flex
        items-center
        rounded-t-lg
        border-gray-200 border-b
        bg-gray-100
        dark:bg-gray-800 dark:border-gray-500
      "
    >
      <div class="flex-1">
        <slot name="info"></slot>
      </div>

      <div
        v-if="store.getters['business/isAdmin']"
        class="text-sm pr-4 opacity-80"
      >
        {{ $props.element.selectedStyle?.name }}
      </div>

      <div class="w-10 opacity-50">#{{ $props.element.order }}</div>

      <div
        v-if="!store.getters['business/isAdmin']"
        class="flex pt-1 gap-x-4 text-2xl opacity-40 cursor-pointer pr-3"
      >
        <div @click="$emit('moveUp')">
          <i class="fa fa-arrow-circle-up"></i>
        </div>
        <div @click="$emit('moveDown')">
          <i class="fa fa-arrow-circle-down"></i>
        </div>
      </div>
    </div>

    <div
      v-if="!store.getters['business/isAdmin']"
      class="absolute flex justify-between px-2 top-1/2 w-full"
    >
      <c-arrow direction="left" @click="stylePrevious"></c-arrow>
      <c-arrow direction="right" @click="styleNext"></c-arrow>
    </div>

    <div
      :class="`
      h-${element.height ? element.height : '40'}
      md:h-${element.mobileHeight ? element.mobileHeight : '40'}
      flex overflow-hidden animate-fade`"
      :key="selectedStyle.name"
    >
      <img
        class="object-cover rounded-b-lg w-full"
        :src="selectedStyle.image"
      />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import store from "@/store";

import CArrow from "@/components/atoms/CArrow/CArrow.vue";

export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
  },

  components: {
    CArrow,
  },

  methods: {
    styleNext() {
      store.dispatch("layout/nextStyle", this.$props.element);
    },

    stylePrevious() {
      store.dispatch("layout/previousStyle", this.$props.element);
    },
  },

  setup(props) {
    return {
      store,
      selectedStyle: computed(() => {
        const selectedStyle = props.element.selectedStyle
          ? props.element.selectedStyle
          : props.element.styles[0];

        return selectedStyle?.name ? selectedStyle : { name: "", image: "" };
      }),
    };
  },
};
</script>

<style scoped></style>
