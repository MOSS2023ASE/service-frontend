<template>
  <div style="background-color: white">
    <el-row>
      <el-tiptap v-model="content" :extensions="extensions"/>
    </el-row>
    <el-row type="flex" justify="space-around" align="middle">
      <el-col :span="2">
        评分
      </el-col>
      <el-col :span="18">
        <el-rate
          v-model="stars"
          :colors="this.colors"
          show-text
        >
        </el-rate>
      </el-col>
      <el-col :span="1">
        <v-btn
          icon
          @click="handleCreateComment()">
          <v-icon>
            mdi-comment-check
          </v-icon>
        </v-btn>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import {createComment} from "@/api/comment";
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
} from 'element-tiptap';
import {mapGetters} from "vuex";

export default {
  name: "TextBox",
  props: {
    dish_id: Number,
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  data() {
    // 编辑器的 extensions
    // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({level: 5}),
        new Bold({bubble: true}), // 在气泡菜单中渲染菜单按钮
        new Underline({bubble: true, menubar: false}), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
      ],
      // 编辑器的内容
      content: `
        <p>发布你的评论！</p>
      `,
      stars: 5,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    };
  },
  methods: {
    changeStars() {
      this.$forceUpdate()
    },
    handleCreateComment() {
      console.log(this.dish_id)
      let query = {
        comment_text: this.content,
        user_id: this.$store.state.user.user_id,
        dish_id: this.dish_id,
        comment_star: this.stars
      }
      console.log(query)
      createComment(query).then((response) => {
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
        this.$emit('close')
      })
    },
  }
}
</script>
