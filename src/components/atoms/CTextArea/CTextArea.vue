<template>
  <div class="w-100">
    <textarea
      class="
        w-100
        resize-none
        text-black
        dark:text-white dark:bg-gray-800
        text-sm
        m-3
      "
      rows="4"
      max-rows="8"
      placeholder="Sua observação aqui..."
      style="width: 95%"
      @input="$emit('update:content', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>
