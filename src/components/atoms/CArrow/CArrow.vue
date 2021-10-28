<template>
  <div
    :class="`
    flex justify-center items-center rounded
    w-10 h-90 z-10 opacity-80 hover:opacity-100
    text-white
    bg-gray-400
    hover:bg-gray-400
    shadow-lg
    text-center
    leading-10
    cursor-pointer
    `"
  >
    <i :class="`fa fa-chevron-${props.direction}`"></i>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
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
