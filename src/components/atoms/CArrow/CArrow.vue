<template>
  <div
    :class="`
    rounded-full
    w-10
    h-10
    text-white
    bg-green-500
    hover:bg-green-600
    opacity-6
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
