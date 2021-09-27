<template>
  <div
    class="
      checkbox
      rounded
      bg-white
      shadow-md
      py-2
      grid grid-cols-checkbox
      items-center
      dark:bg-gray-800
    "
  >
    <div class="justify-self-center">
      <input
        ref="checkbox"
        type="checkbox"
        :checked="checked"
        :disabled="!!required"
        @input="onInput"
      />
    </div>
    <div
      class="border-l-2 px-4 cursor-pointer dark:border-gray-500"
      @click="onClick"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onInput(event) {
      this.$emit("update:checked", event.target.checked);
      this.$emit("valueChanged");
    },
    onClick() {
      if (!this.required) {
        this.$refs.checkbox.click();
      }
    },
  },
};
</script>
