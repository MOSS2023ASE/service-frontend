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
                <v-list-item-title class="headline mb-1">一个问题</v-list-item-title>
                <v-list-item-subtitle>
                  问题描述
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              ></v-list-item-avatar>
            </v-list-item>

            <v-row style="margin-left: 1px">
              <v-card-actions>
                <v-btn outlined color="light-blue lighten-2">数学分析</v-btn>
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
            <v-stepper value="2" flat>
              <v-stepper-header>
                <v-stepper-step step="1" complete>未认领</v-stepper-step>

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
                  :key="item.title"
                  @click=""
                >
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
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
import {deleteComment, getComments} from "@/api/comment";

export default {
  name: "issueInfoDetail",
  components: {MarkdownEditor},
  props: {
    id: {
      type: String,
      default: "01"
    },

  },
  data() {
    return {
      dialog: false,

      issue_id: '2',
      title: '',
      content: '',
      user_name: '',
      user_avatar: '',
      counselor_list: [],
      reviewer_list: [],
      chapter_name: '',
      subject_name: '',
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
      let issueInfoQuery = {
        jwt: this.$store.state.user.token,
        issue_id: this.issue_id
      }
      getComments(issueInfoQuery).then(response => {
        this.title = response.data.title
        this.content = response.data.content
        this.user_name = response.data.user_name
        this.user_avatar = response.data.user_avatar
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
      }).catch(error => {
        this.$notify({
          title: '获取失败',
          message: '获取issue信息失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    initissueComment(){
      let issueCommentQuery = {
        jwt: this.$store.state.user.token,
        issue_id: this.issue_id
      }
      getComments(issueCommentQuery).then(response=>{

      }).catch(err=>{

      })
    },
    like() {

    },
    back() {
      this.$router.go(-1)
    },
    collect() {

    },
    edit() {

    },
    close() {

    },

  },
  computed: {},
  created() {
    this.initIssueId()
  }
}
</script>

<style scoped>

</style>
