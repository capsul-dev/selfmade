<template>
  <div
    :class="`
      ${
        !!props.isLoading
          ? 'bg-gradient-to-r from-green-300 to-green-500'
          : 'bg-gradient-to-r from-green-500 to-green-700'
      }
      text-white text-center
      font-500
      uppercase
      py-3
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
