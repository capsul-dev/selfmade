<template>
  <input
    class="border-box bg-white shadow-sm rounded px-3 py-2"
    :type="type"
    :value="modelValue"
    @input="onInput"
  />
</template>

<script>
/* eslint-disable */

export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      required: true,
    }
  },

  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
