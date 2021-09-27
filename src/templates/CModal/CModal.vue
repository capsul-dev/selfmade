<template>
  <div class="absolute z-10" @click="closeModal">
    <div class="fixed inset-0 bg-gray-900 opacity-50"></div>
    <div class="fixed inset-0 flex justify-center items-center">
      <div
        @click="$event.stopPropagation()"
        class="
          bg-white
          w-full
          h-full
          lg:w-1/2 lg:h-1/2
          z-10
          rounded-lg
          shadow-lg
          p-5
          dark:bg-gray-900 dark:text-white
        "
      >
        <div class="flex mb-6">
          <div class="flex-1 font-bold text-2xl">
            <slot name="title"></slot>
          </div>
          <div class="cursor-pointer text-2xl opacity-50" @click="closeModal">
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
    closeModal() {
      store.dispatch("modal/close");
    },
  },
};
</script>
