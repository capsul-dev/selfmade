<template>
  <div class="section">
    <div class="section__info">
      <div class="section__info__title">
        <slot name="info"></slot>
      </div>
      <div class="section__info__order">#{{ order }}</div>
      <div class="section__info__arrows">
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

    <div class="section__body">
      <div class="section__body__template">
        <slot name="template"></slot>
      </div>

      <div class="section__body__sideopts" v-if="false">
        <c-button>Selecionar</c-button>
        <c-button>Opções</c-button>
      </div>
    </div>

    <div class="section__navigation">
      <div class="section__nav section__nav--left">&lt;</div>
      <div class="section__nav section__nav--right">&gt;</div>
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
