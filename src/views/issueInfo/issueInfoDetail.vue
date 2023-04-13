<template>
  <div id="app">
    <v-app id="inspire">
      <v-card max-width="1600px" flat>
        <v-container fluid>
          <v-card
            outlined
            class="mx-auto"
          >
            <v-card-title>
              <v-btn text color="green" @click="back()">
                <v-icon
                  large
                  left
                >
                  mdi-keyboard-return
                </v-icon>
                返回
              </v-btn>
            </v-card-title>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{ this.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ this.user_name }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                v-if="this.user_id !== 0"
                tile
                size="80"
                color="grey"
              >
                <v-img :src="this.user_avatar"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-text>
              {{ this.content }}
            </v-card-text>
            <v-row style="margin-left: 1px">
              <v-card-actions>
                <v-btn outlined color="light-blue lighten-2"></v-btn>
                <v-btn outlined color="orange lighten-2">第一章</v-btn>
              </v-card-actions>
            </v-row>
            <v-row justify="end" style="margin-right: 10px">
              <v-card-actions>
                <v-btn text @click="like()">
                  <v-icon left>
                    mdi-thumb-up-outline
                  </v-icon>
                  点赞
                </v-btn>
                <v-btn text @click="collect()">
                  <v-icon left>
                    mdi-heart-outline
                  </v-icon>
                  收藏
                </v-btn>
                <v-btn text @click="edit()">编辑</v-btn>
                <v-btn text @click="close()">关闭</v-btn>
              </v-card-actions>
            </v-row>
            <br/>
            <v-stepper :value="this.computeStatus" flat>
              <v-stepper-header>
                <v-stepper-step :rules="[() => this.status !== 5]" step="1" complete>{{this.firstStatus}}</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2">已认领</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">已关闭</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="4">已复审</v-stepper-step>
              </v-stepper-header>
            </v-stepper>
            <v-list three-line>
              <template v-for="(item, index) in items">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                  v-text="item.header"
                ></v-subheader>

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>

                <v-list-item
                  v-else
                  :key="item.user_id"
                  @click=""
                >
                  <v-list-item-avatar>
                    <v-img :src="item.user_avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.user_name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.avatar"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>

        </v-container>
        <v-divider></v-divider>
        <v-container fluid>
          <v-timeline>
            <v-timeline-item
              v-for="n in 10"
              :key="n"
              large
            >
              <template v-slot:icon>
                <v-avatar>
                  <img src="https://pic.imgdb.cn/item/6395462eb1fccdcd36ecbe97.jpg">
                </v-avatar>
              </template>
              <template v-slot:opposite>
                <span>2023.9.23 10pm</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">Lorem ipsum</v-card-title>
                <v-card-text>
                  <p><img src="https://pic.imgdb.cn/item/64170667a682492fcc17c248.png">我不懂我不懂我不懂</p>
                  <p></p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-container>
        <v-divider></v-divider>
      </v-card>
      <div>
        <markdown-editor v-model="content" height="500px"/>
      </div>
      <br/>
      <v-row justify="end" style="margin-right: 10px;">
        <v-btn raised color="green">保存</v-btn>
        <v-spacer style="max-width: 10px"></v-spacer>
        <v-btn raised color="light-blue darken-2">发布</v-btn>
      </v-row>
      <br/>
    </v-app>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import {get_issue_detail,like_issue,follow_issue,check_follow_issue,check_like_issue,cancel_issue} from "@/api/issue";
import {get_issue_all_comments,create_comment,delete_comment} from "@/api/forum";

export default {
  name: "issueInfoDetail",
  components: {MarkdownEditor},
  props: {
    id: {
      type: Number,
      default: 0
    },

  },
  data() {
    return {
      dialog: false,

      issue_id: '2',
      title: 'Title',
      content: '内容',
      user_name: 'wakaka',
      user_id:1,
      user_avatar: '',
      counselor_list: [],
      reviewer_list: [],
      items:[],
      chapter_name: '数学分析',
      subject_name: '第一章',
      status: '',
      anonymous: 0,
      create_at: '',
      update_at: '',
      score: 0,
      tag_list: [],
      editorText: "发布你的回答",
      editorOptions: {},
    }
  },
  methods: {
    initIssueId() {
      this.issue_id = this.$route.params.issue_id
      console.log(this.issue_id)
    },
    initissueInfo() {
      let jwt = this.$store.state.user.token
      get_issue_detail(jwt, this.issue_id).then(response => {
        this.title = response.data.title
        this.content = response.data.content
        this.user_name = response.data.user_name
        this.user_avatar = response.data.user_avatar
        this.user_id = response.data.user_id
        this.counselor_list = response.data.counselor_list
        this.reviewer_list = response.data.reviewer_list
        this.chapter_name = response.data.chapter_name
        this.subject_name = response.data.subject_name
        this.status = response.data.status
        this.anonymous = response.data.anonymous
        this.create_at = response.data.create_at
        this.update_at = response.data.update_at
        this.score = response.data.score
        this.tag_list = response.data.tag_list
        let divide = { divider: true, inset: true }
        let counselor_head = {header: '回答者'}
        let reviewer_head = {header: '复审者'}
        let o
        this.$nextTick(() => {
          this.items = []
          this.items.push(counselor_head)
          for (o in this.counselor_list) {
            this.items.push(this.counselor_list[o])
            this.items.push(divide)
          }
          this.items.push(reviewer_head)
          for (o in this.reviewer_list) {
            this.items.push(this.reviewer_list[o])
            this.items.push(divide)
          }
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }).catch(error => {
        this.$notify({
          title: '获取失败',
          message: '获取issue信息失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    initissueComment() {
      let issueCommentQuery = {
        jwt: this.$store.state.user.token,
        issue_id: this.issue_id
      }

    },
    like() {
      let jwt = this.$store.state.user.token
      like_issue(jwt,this.issue_id).then(response=>{
        this.$notify({
          title: '点赞成功',
          message: 'issue点赞成功',
          type: 'success',
          duration: 2000
        })
      }).catch(err=>{
        this.$notify({
          title: '点赞失败',
          message: 'issue点赞失败',
          type: 'warning',
          duration: 2000
        })
      })
      //TODO 图标的颜色转换
    },
    back() {
      this.$router.go(-1)
    },
    collect() {
      let jwt = this.$store.state.user.token
      follow_issue(jwt,this.issue_id).then(response=>{
        this.$notify({
          title: '收藏成功',
          message: 'issue收藏成功',
          type: 'success',
          duration: 2000
        })
      }).catch(err=>{
        this.$notify({
          title: '收藏失败',
          message: 'issue收藏失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    edit() {

    },
    close() {
      let jwt = this.$store.state.user.token
      cancel_issue(jwt,this.issue_id).then(response=>{
        this.status = 5
        this.$notify({
          title: '关闭成功',
          message: 'issue关闭成功',
          type: 'success',
          duration: 2000
        })
      }).catch(err=>{
        this.$notify({
          title: '关闭失败',
          message: 'issue关闭成功',
          type: 'warning',
          duration: 2000
        })
      })
    },

  },
  computed: {
    computeStatus(){
      if(this.status === 0 || this.status === 1){
        return this.status+1
      }else if(this.status ===  2) {
        return 1
      }else if(this.status === 5){
        return 0
      }else{
        return this.status
      }
    },
    firstStatus(){
      if(this.status === 5){
        return "无效问题"
      }else{
        return "未认领"
      }
    }
  },
  created() {
    this.initIssueId()
  }
}
</script>

<style scoped>

</style>
