<template>
    <el-dialog :visible.sync="commentVisible" title="评论列表" width="600px" :before-close="onClose" :append-to-body="true">
      <el-table
        style="width: 100%"
        :data="comments"
        align="center"
        fit
        highlight-current-row
      >
        <el-table-column
          prop="comment_id"
          label="评论ID"
          width="100%"
          align="center"
        >
          <template v-slot="{row}">
            <span>{{ row.comment_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="评论用户"
          width="100%"
          align="center"
        >
          <template v-slot="{row}">
            <span>{{ row.headline }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="comment_content"
          label="评论内容"
          width="100%"
          align="center"
        >
          <template v-slot="{row}">
            <v-html>{{ row.subtitle }}</v-html>
          </template>
        </el-table-column>
        <el-table-column
          prop="comment_star"
          label="评分"
          width="100%"
          align="center"
        >
          <template v-slot="{row}">
            <el-rate
              v-model="row.comment_star"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100%"
          align="center"
        >
          <template v-slot="{row,$index}">
            <el-button size="mini" type="danger" @click="handleDeleteComment(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
</template>

<script>
import {deleteComment, getComments} from "@/api/comment";

export default {
  name: "commentDialog",
  props: {
    commentVisible: false,
    dish_id: ''
  },
  created() {
    this.handleGetComments()
  },
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      comments: []
    }
  },
  methods: {
    handleGetComments() {
      let list_query = {user_id: this.user_id, dish_id: this.dish_id}
      getComments(list_query).then((response) => {
        let originData = response.data.comment_list
        console.log(originData)
        let o = {}
        this.$nextTick(() => {
          this.comments = []
          for (o in originData) {
            let comment = {
              comment_id: originData[o].comment_id,
              user_id: originData[o].user_id,
              action: '',
              headline: originData[o].user_name,
              title: '评论',
              subtitle: originData[o].comment_text,
              comment_star: originData[o].comment_star
            }
            this.comments.push(comment)
          }
        })
      })
    },
    handleDeleteComment(row) {
      let query = {
        comment_id: row.comment_id
      }
      deleteComment(query).then(() => {
        this.$nextTick(() => {
          this.handleGetComments()
        })
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
