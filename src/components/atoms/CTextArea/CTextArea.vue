<template>
  <div class="w-100">
    <textarea
      class="w-100  resize-none text-black dark:text-white dark:bg-gray-800 text-sm m-3"
      rows="4"
      max-rows="8"
      placeholder="Sua observação aqui..."
      style="width: 95%"
      v-model="props.content"
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

  setup(props) {
    return {
      props,
    };
  },
};
</script>