<template>
  <div :class="`button button--base ${makeClasses}`" :draggable="classes.includes('draggable')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: Array,
      default: () => ['default'],
    }
  },
  computed: {
    makeClasses() {
      return typeof this.classes !== 'string'
        ? this.classes.reduce((a, c) => c + ` button--${a}`, '')
        : `button--${this.classes}`
    }
  }
}
</script>

<style scoped src="./button.css"></style>
