<template>
  <div class="relative border-2 bg-white">
    <div class="flex items-center">
      <div class="border-red-500 border-2 flex-1">
        <slot name="info"></slot>
      </div>
      <div class="w-10">#{{ order }}</div>
      <div class="flex gap-x-2 border-blue-500 border-2 text-2xl opacity-40">
        <div @click="$emit('moveUp')" class="section__arrow section__arrow--up">
          <i class="fa fa-arrow-circle-up"></i>
        </div>
        <div
          @click="$emit('moveDown')"
          class="section__arrow section__arrow--down"
        >
          <i class="fa fa-arrow-circle-down"></i>
        </div>
      </div>
    </div>

    <div class="h-40">
      <div class="section__body__template">
        <slot name="template"></slot>
      </div>

      <div class="section__body__sideopts" v-if="false">
        <c-button>Selecionar</c-button>
        <c-button>Opções</c-button>
      </div>
    </div>

    <div class="section__navigation">
      <div class="absolute top-1/2 left-5">
        <i class="fa fa-chevron-left"></i>
      </div>
      <div class="absolute top-1/2 right-5">
        <i class="fa fa-chevron-right"></i>
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
