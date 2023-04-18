<template>
  <mavon-editor @imgAdd="imageAdd" :externalLink="externalLink" ref="editor" v-model="content" :toolbars="toolbars" />
</template>

<script>
import { externalLink } from '@/api/url';
import { uploadPublic } from '@/api/upload';
import markdownItMermaid from '@wekanteam/markdown-it-mermaid';

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  mounted: function () {
    const md = this.$refs.editor;
    (md.markdownIt || md.getMarkdownIt()).use(markdownItMermaid);
  },
  data: function () {
    return {
      content: this.value,
      externalLink: externalLink,
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        undo: true,
        redo: true,
        trash: true,
        save: false,
        navigation: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: true,
        preview: true
      }
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
  },
  methods: {
    async imageAdd(pos, file) {
      let formData = new FormData();
      formData.append('file', file);
      let response = await uploadPublic(formData);
      if (response && response.data) {
        this.$refs.editor.$img2Url(pos, response.data);
      }
    }
  }
};
</script>

<style scoped></style>
