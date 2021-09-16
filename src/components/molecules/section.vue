<template>
  <div class="section">
    <div class="section__order">
      #{{ order }}
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
import CButton from '@/components/atoms/button.vue'

export default {
  components: {
    CButton,
  },

  props: {
    order: {
      type: Number,
      required: true,
    }
  }
}
</script>

<style scoped src="./section.css"></style>
