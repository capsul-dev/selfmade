<template>
  <div
    class="
      bg-blue-500
      hover:bg-blue-700
      text-white text-center
      font-bold
      py-2
      px-4
      rounded
      cursor-pointer
    "
    :draggable="classes.includes('draggable')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      default: () => ["default"],
    },
  },
  computed: {
    makeClasses() {
      return typeof this.classes !== "string"
        ? this.classes.reduce((a, c) => c + ` button--${a}`, "")
        : `button--${this.classes}`;
    },
  },
};
</script>
