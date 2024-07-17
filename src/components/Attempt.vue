<!-- I want to try importing images to see if it will work  -->

<template>
    <div>
      <Vision visionIcon="../assets/binoculars.png" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import Vision from "./Vision.vue";
  
  export default defineComponent({
    components: {
      Vision,
    },
  });
  </script>
  