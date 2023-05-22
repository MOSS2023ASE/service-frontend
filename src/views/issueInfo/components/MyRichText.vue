<template>
  <div class="rich-text">
    <div style="margin-top: 10px" v-html="this.content" class="text-subtitle-1"></div>
  </div>
</template>

<script>
import DOMPurify from "dompurify";

export default {
  props: {
    content: {
      type: String,
      required: true
    },
  },
  data(){
    return {

    }
  },
  mounted() {

  }
}
</script>

<style>
.rich-text {
  max-width: 100%;
  overflow: hidden;
}

.rich-text p {
  margin: 0;
  padding: 0;
}

.rich-text img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
