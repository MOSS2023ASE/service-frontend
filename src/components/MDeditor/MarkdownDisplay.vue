<template>
  <mavon-editor
    class="mavon-editor"
    ref="md"
    :toolbars-flag="false"
    :navigation="false"
    :editable="false"
    :subfield="false"
    :scroll-style="true"
    preview-background="fff-fff"
    box-shadow-style="0"
    default-open="preview"
    style="min-height: 0"
    v-model="value"
  ></mavon-editor>
</template>

<script>
import mdKatex from "@iktakahiro/markdown-it-katex"

export default {
  props: {
    value: {
      required: true
    }
  },
  mounted: function () {
    const { md } = this.$refs;
    (md.markdownIt || md.getMarkdownIt()).use(mdKatex);
  },
  data: function () {
    return {
      content: this.value,
    };
  },
  watch: {
    value: function (updated) {
      this.content = updated;
    },
    content: function (old, updated) {
      if (old !== updated) {
        this.$emit('input', this.content);
      }
    }
  }
};
</script>

<style scoped>
.mavon-editor {
  position: relative;
  z-index: 0;
}
</style>
