<template>
  <label class="px-2">
    <div class="text-sm opacity-80">
      <slot></slot>
    </div>
    <input
      class="w-full border-box bg-white shadow-sm rounded px-3 py-2 mb-2"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
    />
  </label>
</template>

<script>
/* eslint-disable */

  export default {
    props: {
      modelValue: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: "text",
      },
      placeholder: {
        type: String,
        required: false,
      }
    },

    methods: {
      onInput(event) {
        this.$emit("update:modelValue", event.target.value);
      },
    },
  };
</script>
