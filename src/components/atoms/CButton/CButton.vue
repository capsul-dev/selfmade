<template>
  <div
    :class="`
      ${
        !!props.isLoading
          ? 'bg-gray-200'
          : 'bg-gradient-to-r from-green-500 to-green-700'
      }
      text-white text-center
      font-bold
      py-2
      px-4
      rounded
      cursor-pointer
      `"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    return {
      props,
    };
  },
};
</script>
