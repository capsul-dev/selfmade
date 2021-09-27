<template>
  <label class="px-2 my-1">
    <div class="text-sm opacity-80 mb-2">
      <slot></slot>
    </div>
    <input
      class="
        w-full
        border-box
        bg-white
        shadow-sm
        px-3
        bg-gray-100
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
    maska
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
//      if (
//        typeof this.$props.mask === "string" &&
//        event.target.value.length >= this.$props.mask.length
//      ) {
//        console.log("aaa")
//
//        event.stopPropagation()
//        return;
//      }
//
//      const value = this.$props.mask
//        ? mask(event.target.value, this.$props.mask)
//        : event.target.value;

      this.$emit("update:modelValue", event.target.value);
    },

    onChange(event) {
      this.$refs.input.value = event.target.value;
    },
  },
};
</script>
