<template>
  <div class="rich-text">
    <div v-html="content"></div>
  </div>
</template>

<script>
import DOMPurify from "dompurify";

export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.sanitizedHtml = DOMPurify.sanitize(this.content, {
      ALLOWED_TAGS: ['p', 'a', 'b', 'i', 'strong', 'em', 'br', 'img'],
      ALLOWED_ATTR: ['href', 'target', 'src']
    });
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
