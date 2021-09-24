<template>
  <div class="p-3 lg:p-5 border-b border-gray-200 dark:border-gray-700 dark:text-white">
    <div class="mb-10" v-if="$slots.title || $slots.description">
      <div class="text-4xl uppercase font-normal mb-5" v-if="$slots.title">
        <slot name="title"></slot>
      </div>
      <div class="opacity-80 text-xl mb-4" v-if="$slots.description">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="step__body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
