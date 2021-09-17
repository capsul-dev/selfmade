<template>
  <div class="section">
    <div class="section__top">
      <div class="section__top__order">#{{ order }}</div>
      <div class="section__top__arrows">
        <div @click="$emit('moveUp')" class="section__arrow section__arrow--up">
          Sobe
        </div>
        <div
          @click="$emit('moveDown')"
          class="section__arrow section__arrow--down"
        >
          Desce
        </div>
      </div>
    </div>
    <div class="section__title">
      <slot name="title"></slot>
    </div>

    <div class="section__body">
      <div class="section__body__template">
        <slot name="template"></slot>
      </div>

      <div class="section__body__sideopts">
        <c-button>Selecionar</c-button>
        <c-button>Opções</c-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped src="./section.css"></style>
