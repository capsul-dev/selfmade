<template>    
  <img :src="source">
</template>

<script>
import  {version} from "../../../../package.json";
export default {
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  data() {
    return { version }
  }
};
</script>
