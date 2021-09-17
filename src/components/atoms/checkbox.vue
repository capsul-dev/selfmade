<template>
  <div class="checkbox">
    <div class="checkbox__input">
      <input
        id="checkbox"
        type="checkbox"
        :checked="checked"
        :disabled="!!required"
        @input="onInput"
      />
    </div>
    <label class="checkbox__text" for="checkbox">
      <slot></slot>
    </label>
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
  },
};
</script>

<style scoped src="./checkbox.css"></style>
