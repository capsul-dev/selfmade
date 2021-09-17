<template>
  <input :type="type" :value="modelValue" @input="onInput" />
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

<style scoped src="./input.css"></style>
