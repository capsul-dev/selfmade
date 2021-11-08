<template>
  <div class="w-100">
    <textarea
      class="
        w-100
        resize-none
        text-black
        bg-gray-100
        dark:text-white dark:bg-gray-800
        text-sm
        m-3
        p-1
        placeholder-gray-800
        dark:placeholder-gray-400
      "
      rows="4"
      max-rows="8"
      placeholder="Sua observação aqui..."
      style="width: 95%"
      :value="content"
      :readonly="isReadOnly"
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
    isReadOnly: {
        type: Boolean,
        default: false,
    }
  },
};
</script>
