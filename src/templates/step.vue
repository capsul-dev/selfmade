<template>
  <div class="step">
    <div class="step__header">
      <div class="step__header__title">
        <slot name="title"></slot>
      </div>
      <div class="step__header__description">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="step__body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style scoped src="./step.css"></style>
