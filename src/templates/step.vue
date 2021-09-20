<template>
  <div class="p-5 shadow-md bg-blue-50">
    <div class="mb-10">
      <div class="text-lg font-bold">
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
