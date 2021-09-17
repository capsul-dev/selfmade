<template>
  <div class="checkbox">
    <div class="checkbox__input">
      <input
        ref="checkbox"
        type="checkbox"
        :checked="checked"
        :disabled="!!required"
        @input="onInput"
      />
    </div>
    <div class="checkbox__text" @click="onClick">
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
      this.$emit('update:checked', !this.$refs.checkbox.checked);
    }
  },
};
</script>

<style scoped src="./checkbox.css"></style>
