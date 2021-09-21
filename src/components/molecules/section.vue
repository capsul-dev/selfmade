<template>
  <div class="relative rounded-lg bg-white shadow-lg">
    <div class="flex items-center border-gray-200 border-b bg-gray-100">
      <div class="flex-1">
        <slot name="info"></slot>
      </div>
      <div class="w-10 opacity-50">#{{ $props.element.order }}</div>
      <div class="flex pt-1 gap-x-4 text-2xl opacity-40 cursor-pointer pr-3">
        <div @click="$emit('moveUp')">
          <i class="fa fa-arrow-circle-up"></i>
        </div>
        <div @click="$emit('moveDown')">
          <i class="fa fa-arrow-circle-down"></i>
        </div>
      </div>
    </div>

    <div class="flex h-40 overflow-hidden">
      <img class="object-cover w-full" :src="selectedStyle.image" />
    </div>

    <div class="w-full">
      <div
        class="
          absolute
          top-1/2
          left-5
          rounded-full
          w-10
          h-10
          bg-white
          opacity-6
          hover:bg-blue-500 hover:text-white
          shadow-lg
          text-center
          leading-10
          cursor-pointer
        "
        @click="stylePrevious"
      >
        <i class="fa fa-chevron-left"></i>
      </div>
      <div
        class="
          absolute
          top-1/2
          right-5
          rounded-full
          w-10
          h-10
          bg-white
          opacity-6
          hover:bg-blue-500 hover:text-white
          shadow-lg
          text-center
          leading-10
          cursor-pointer
        "
        @click="styleNext"
      >
        <i class="fa fa-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import store from "@/store";

export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
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
