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
    <div class="border-l-2 px-4 cursor-pointer" @click="onClick">
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
    },
    onClick() {
      if (!this.required) {
        this.$emit("update:checked", !this.$refs.checkbox.checked);
      }
    },
  },
};
</script>
