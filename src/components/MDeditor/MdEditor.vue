<template>
  <mavon-editor class="mavon-editor" @imgAdd="imageAdd" :ishljs="true"  ref="editor" v-model="value" :toolbars="toolbars" />
</template>

<script>
import {upload_public} from "@/api/upload";
import mdKatex from "@iktakahiro/markdown-it-katex"

export default {
  name: "MDeditor",
  props: {
    value: {
      type: String,
      required: true
    }
  },
  mounted: function () {
    const md = this.$refs.editor;
    (md.markdownIt || md.getMarkdownIt()).use(mdKatex);
  },
  data: function () {
    return {
      content: this.value,
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
      let jwt = this.$store.state.user.token
      let formData = new FormData();
      formData.append('file', file);
      upload_public(formData).then(response => {
        if (response.data) {
          this.$refs.editor.$img2Url(pos, response.data.url);
        }
      }).catch(err => {
        this.$notify({
          title: '上传图片失败',
          message: '上传图片信息失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    getHtml() {
      return this.value
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
