<template>
  <div class="absolute z-10">
    <div class="fixed inset-0 bg-gray-900 opacity-50"></div>
    <div class="fixed inset-0 flex justify-center items-center">
      <div
        class="
          bg-white
          w-full
          h-full
          lg:w-1/2 lg:h-1/2
          z-10
          rounded-lg
          shadow-lg
          p-5
        "
      >
        <div class="flex mb-6">
          <div class="flex-1 font-bold text-2xl">
            <slot name="title"></slot>
          </div>
          <div class="cursor-pointer text-2xl opacity-50" @click="onClick">
            <i class="fa fa-close"></i>
          </div>
        </div>

        <div class="w-full">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  methods: {
    onClick() {
      store.dispatch("modal/close");
    },
  },
};
</script>
