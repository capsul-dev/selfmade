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
        v-if="showArrows"
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
      role="selfmadeSection"
      :class="`relative flex overflow-hidden animate-fade
        h-${selectedStyle.height ? selectedStyle.height : '40'}
        md:h-${
          selectedStyle.mobileHeight ? selectedStyle.mobileHeight : 'auto'
        }`"
      :key="selectedStyle.name"
    >
      <div
        v-if="!store.getters['business/isAdmin']"
        class="absolute flex justify-between w-full h-full"
      >
        <c-arrow direction="left" @click="stylePrevious"></c-arrow>
        <c-arrow direction="right" @click="styleNext"></c-arrow>
      </div>
      <img
        class="object-cover rounded-b-lg w-full"
        :src="selectedStyle.image"
      />
    </div>
    <c-text-area :is-read-only="store.getters['business/isAdmin']"
     v-model:content="detail"></c-text-area>
  </div>
</template>

<script>
import { computed } from "vue";
import store from "@/store";

import { CArrow, CTextArea } from "@/components";

export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
  },

  components: {
    CArrow,
    CTextArea,
  },

  computed: {
    detail: {
      get() {
        return new String(this.element.detail)
      },
      set(value) {
        this.store.commit('layout/DETAIL_SET', { target: this.element, value })
      }
    }
  },

  methods: {
    styleNext() {
      store.dispatch("layout/nextStyle", this.element);
    },

    stylePrevious() {
      store.dispatch("layout/previousStyle", this.element);
    },
  },

  setup(props) {
    return {
      store,
      showArrows: computed(
        () =>
          !store.getters["business/isAdmin"] &&
          typeof props.element.originalOrder !== "number"
      ),
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
