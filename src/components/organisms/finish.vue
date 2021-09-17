<template>
  <div class="finish">
    <div class="finish__left">
      Blah
    </div>
    <div class="finish__right">
      <div class="finish__right__disclaimer">
        Ao salvar você concorda com os nossos Termos de Uso.
      </div>
      <c-button classes="confirm" @click="exportJSON">Salvar</c-button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    return {
      store
    }
  },

  methods: {
    exportJSON() {
      const sections = JSON.stringify(this.store.getters['layout/sections'])
      console.log({ sections })
    }
  }
}
</script>

<style scoped src="./finish.css"></style>
