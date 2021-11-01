<template>
  <span class="text-gray-300">v{{ version }}</span>
</template>

<script>
import { version } from "@/../package.json";
export default {
   setup() {
      return { 
         version     
      }
   }
}
</script>
