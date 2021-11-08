<template>
  <label class="px-2 my-1">
    <div class="text-sm opacity-80 mb-2 ml-2 font-semibold">
      <slot></slot>
    </div>
    <input
      class="
        w-full
        border-box
        bg-white
        placeholder-gray-600
        dark:placeholder-gray-500
        shadow-lg
        px-3
        bg-white
        py-2
        mb-2
        dark:bg-gray-800 dark:text-white
        rounded-full
      "
      ref="input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      @change="onChange"
      v-maska="$props.mask"
    />
  </label>
</template>

<script>
import { maska } from "maska";

export default {
  directives: {
    maska,
  },

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
    },
    mask: {
      type: String,
      required: false,
    },
  },

  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },

    onChange(event) {
      this.$refs.input.value = event.target.value;
    },
  },
};
</script>
