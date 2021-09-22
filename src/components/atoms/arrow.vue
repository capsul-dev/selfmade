<template>
  <div
    :class="`
    absolute
    top-1/2
    ${props.direction}-5
    rounded-full
    w-10
    h-10
    bg-white
    opacity-6
    hover:bg-blue-500 hover:text-white
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
