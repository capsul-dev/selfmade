<template>
  <div class="text-blue-500">
    {{ props.details.id }}
    Teste
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
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
