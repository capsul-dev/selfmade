<template>
  <div class="p-3 lg:p-5 shadow-md bg-gray-50">
    <div class="mb-10">
      <div class="text-lg font-bold mb-4">
        <slot name="title"></slot>
      </div>
      <div class="opacity-80 mb-4">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="step__body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
