<template>
  <div class="overlay">
    <div class="overlay__back"></div>
    <div class="overlay__box">
      <div class="overlay__box__top">
        <div class="overlay__box__title">
          <slot name="title"></slot>
        </div>
        <div class="overlay__box__close" @click="onClick"></div>
      </div>
      <div class="overlay__box__body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  methods: {
    onClick() {
      store.dispatch("overlay/close");
    },
  },
};
</script>

<style scoped src="./overlay.css"></style>
