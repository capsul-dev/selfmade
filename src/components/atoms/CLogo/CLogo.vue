<template>
  <div>
    <img :src="source">
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      required: true,
    },
  },
};
</script>
