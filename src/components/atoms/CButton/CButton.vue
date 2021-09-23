<template>
  <div
    :class="`
      ${!!props.isLoading ? 'bg-gray-200' : 'bg-blue-500 hover:bg-blue-700'}
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
