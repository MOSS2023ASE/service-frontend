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
              <MyRichText :content="this.content"></MyRichText>
            </v-card-text>

            <v-row style="margin-left: 1px">
              <v-card-actions>
                <v-btn v-for="(tag, index) in tag_list" :key="index" outlined color="orange lighten-2">{{ tag }}</v-btn>
              </v-card-actions>
            </v-row>
            <v-row justify="end" style="margin-right: 10px">
              <v-card-actions>
                <v-btn text @click="like()" :color="this.likeIconColor">
                  <v-icon left>
                    mdi-thumb-up-outline
                  </v-icon>
                  点赞
                </v-btn>
                <v-btn text @click="collect()" :color="this.followIconColor">
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
                <v-stepper-step :rules="[() => this.status !== 5]" step="1" complete>{{ this.firstStatus }}
                </v-stepper-step>

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
              v-for="(comment, index) in comment_list"
              :key="index"
              large
            >
              <template v-slot:icon>
                <v-avatar>
                  <img :src="comment.avatar">
                </v-avatar>
              </template>
              <template v-slot:opposite>
                <span>{{ comment.time }}</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">{{ comment.name }}</v-card-title>
                <v-card-text>
                  <MyRichText :content="comment.content"></MyRichText>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-container>
        <v-divider></v-divider>
      </v-card>
      <div>
        <markdown-editor ref="editor" v-model="content" height="500px"/>
      </div>
      <br/>
      <v-row justify="end" style="margin-right: 10px;">
        <v-btn raised color="light-blue darken-2" @click="handleComment()">发布</v-btn>
      </v-row>
      <br/>
    </v-app>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import MyRichText from "@/views/issueInfo/components/MyRichText";
import {
  get_issue_detail,
  like_issue,
  follow_issue,
  check_follow_issue,
  check_like_issue,
  cancel_issue
} from "@/api/issue";
import {get_issue_all_comments, create_comment, delete_comment} from "@/api/forum";

export default {
  name: "issueInfoDetail",
  components: {MarkdownEditor, MyRichText},
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
      content: '<p>这是一段富文本内容</p><p><img src="https://pic.imgdb.cn/item/6395462eb1fccdcd36ecbeb8.jpg"></p>',
      comment_list: [{
        "comment_id": 4,
        "content": "<p>这是一段富文本内容</p><p><img src=\"https://pic.imgdb.cn/item/6395462eb1fccdcd36ecbeb8.jpg\"></p>",
        "time": "2022-12-11 18:43:03",
        "user_id": 3,
        "user_role": 0,
        "avatar": "https://pic.imgdb.cn/item/6395462eb1fccdcd36ecbeb8.jpg",
        "name": "李松泽"
      }],
      sanitizedHtml: '',
      user_name: 'wakaka',
      user_id: 1,
      user_avatar: 'https://pic.imgdb.cn/item/6395462eb1fccdcd36ecbeb8.jpg',
      counselor_list: [],
      reviewer_list: [],
      items: [],
      chapter_name: '数学分析',
      subject_name: '第一章',
      islike: 0,
      isfollow: 0,
      status: '',
      anonymous: 0,
      create_at: '',
      update_at: '',
      score: 0,
      tag_list: ['课后题', '定理问题'],
      editorText: "发布你的回答",
      editorOptions: {},
    }
  },
  methods: {
    initIssueId() {
      this.issue_id = this.$route.params.issue_id
      console.log(this.issue_id)
    },
    initLike() {
      let jwt = this.$store.state.user.token
      check_like_issue(jwt, this.issue_id).then(response => {
          this.islike = response.data.is_like
        }
      ).catch(err => {
        this.$notify({
          title: '获取信息失败',
          message: '获取点赞信息失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    initFollow() {
      let jwt = this.$store.state.user.token
      check_follow_issue(jwt, this.issue_id).then(response => {
          this.isfollow = response.data.is_follow
        }
      ).catch(err => {
        this.$notify({
          title: '获取信息失败',
          message: '获取收藏信息失败',
          type: 'warning',
          duration: 2000
        })
      })
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
        let divide = {divider: true, inset: true}
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
      let jwt = this.$store.state.user.token
      get_issue_all_comments(jwt, this.issue_id).then(response => {
        this.comment_list = response.data.comment_list
      }).catch(err => {
        this.$notify({
          title: '获取失败',
          message: '获取comment信息失败',
          type: 'warning',
          duration: 2000
        })
      })

    },
    like() {
      let jwt = this.$store.state.user.token
      like_issue(jwt, this.issue_id).then(response => {
        this.initLike()
      }).catch(err => {
        this.$notify({
          title: '点赞操作失败',
          message: 'issue点赞操作失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    back() {
      this.$router.go(-1)
    },
    collect() {
      let jwt = this.$store.state.user.token
      follow_issue(jwt, this.issue_id).then(response => {
        this.initFollow()
      }).catch(err => {
        this.$notify({
          title: '收藏操作失败',
          message: 'issue收藏操作失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    edit() {

    },
    close() {
      let jwt = this.$store.state.user.token
      cancel_issue(jwt, this.issue_id).then(response => {
        this.status = 5
        this.$notify({
          title: '关闭成功',
          message: 'issue关闭成功',
          type: 'success',
          duration: 2000
        })
      }).catch(err => {
        this.$notify({
          title: '关闭失败',
          message: 'issue关闭失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    handleComment(){
      const html = this.$refs.editor.getHtml();
      let jwt = this.$store.state.user.token
      create_comment(jwt,this.issue_id,html).then(response=>{
        this.initissueComment()
      }).catch(err=>{
        this.$notify({
          title: '发表失败',
          message: 'comment发表失败',
          type: 'warning',
          duration: 2000
        })
      })
    }
  },
  computed: {
    computeStatus() {
      if (this.status === 0 || this.status === 1) {
        return this.status + 1
      } else if (this.status === 2) {
        return 1
      } else if (this.status === 5) {
        return 0
      } else {
        return this.status
      }
    },
    firstStatus() {
      if (this.status === 5) {
        return "无效问题"
      } else {
        return "未认领"
      }
    },
    likeIconColor() {
      if (this.islike === 1) {
        return "pink"
      } else {
        return "black"
      }
    },
    followIconColor() {
      if (this.isfollow === 1) {
        return "pink"
      } else {
        return "black"
      }
    }
  },
  created() {
    this.initIssueId()
    //this.initLike()
    //this.initFollow()
    //this.initissueInfo()
    //this.initissueComment()
  },
}
</script>

<style scoped>

</style>
