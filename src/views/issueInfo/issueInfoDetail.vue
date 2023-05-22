<template>
  <div id="app">
    <v-app id="inspire">
      <v-card flat>
        <v-container fluid>
          <v-card
            outlined
            class="mx-auto"
          >
            <v-card-title>
              <v-btn text color="#1687A7" @click="back()">
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
                <v-list-item-title class="headline">{{ this.title }} (id:{{ this.issue_id }})</v-list-item-title>
                <v-list-item-subtitle class="headline">
                  {{ this.user_name }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                v-if="this.user_id !== 0"
                tile
                size="80"
                color="white"
              >
                <v-img :src="this.user_avatar"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-text>
              <MyRichText :content="this.santinize(this.html_content)"></MyRichText>
            </v-card-text>

            <v-row style="margin-left: 1px">
              <v-card-actions>
                <v-btn text color="blue">{{ this.subject_name }}</v-btn>
                <v-btn text color="blue">{{ this.chapter_name }}</v-btn>
              </v-card-actions>
            </v-row>
            <v-row justify="end" style="margin-right: 10px">
              <v-card-actions>
                <v-btn text @click="like()" :color="this.likeIconColor">
                  <v-icon left>
                    mdi-thumb-up-outline
                  </v-icon>
                  点赞
                  {{ this.likes }}
                </v-btn>
                <v-btn text @click="collect()" :color="this.followIconColor">
                  <v-icon left>
                    mdi-heart-outline
                  </v-icon>
                  收藏
                  {{ this.follows }}
                </v-btn>
                <v-btn v-show="this.allow_comment === 1" outlined @click="edit()" color="green">编辑</v-btn>
                <v-btn v-show="this.status_trans_permit[1] === 1" outlined @click="openConfirm(confirmText.close,close)"
                       color="deep-orange">关闭
                </v-btn>
                <v-btn v-show="this.status_trans_permit[2] === 1" outlined
                       @click="openConfirm(confirmText.reject,reject)" color="red">
                  拒绝辅导师回答
                </v-btn>
                <v-btn v-show="this.status_trans_permit[3] === 1" outlined @click="openConfirm(confirmText.agree,agree)"
                       color="blue">
                  同意辅导师回答
                </v-btn>

                <v-btn v-show="this.status_trans_permit[0] === 1" outlined @click="openConfirm(confirmText.adopt,adopt)"
                       color="blue">认领问题
                </v-btn>
                <v-btn v-show="this.status_trans_permit[4] === 1" outlined
                       @click="openConfirm(confirmText.review,review)" color="green">复审问题
                </v-btn>
                <v-btn v-show="this.status_trans_permit[5] === 1" outlined @click="readopt(confirmText.readopt,readopt)"
                       color="cyan">重新认领
                </v-btn>
                <v-btn v-show="this.status_trans_permit[6] === 1" outlined
                       @click="validIssue(confirmText.validIssue,validIssue)" color="green">
                  有效问题
                </v-btn>
                <v-btn v-show="this.status_trans_permit[6] === 1" outlined
                       @click="invalidIssue(confirmText.invalidIssue,invalidIssue)" color="red">
                  无效问题
                </v-btn>
                <v-btn v-show="true" outlined @click="showRealte" color="orange">
                  相关问题
                </v-btn>
              </v-card-actions>
            </v-row>
            <br/>
            <v-stepper :value="this.status" flat>
              <v-stepper-header>
                <v-stepper-step step="0">未认领
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="1">已认领</v-stepper-step>

                <v-divider></v-divider>
                <v-stepper-step step="2">未认领复审</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">已认领复审</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4" :complete="this.status === 4" color="success">有效问题</v-stepper-step>

                <v-divider></v-divider>
                <v-stepper-step :rules="[() => this.status !== 5]" step="5">无效问题</v-stepper-step>
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
                ></v-divider>

                <v-list-item
                  v-else
                  :key="index"
                  @click=""
                >
                  <v-list-item-avatar>
                    <v-img :src="item.user_avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.user_name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>

        </v-container>
        <v-divider></v-divider>
        <v-container fluid>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="(comment, index) in currentPageItems"
              :key="index"
              large
            >
              <template v-slot:icon>
                <v-avatar>
                  <img :src="comment.avatar">
                </v-avatar>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">{{ comment.name }}</v-card-title>
                <v-card-subtitle class="subtitle-1"><span>{{ comment.time.slice(0, 10) }} {{
                    comment.time.slice(11, 16)
                  }}</span></v-card-subtitle>
                <v-card-text>
                  <MyRichText :content="comment.content"></MyRichText>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
          ></v-pagination>
        </v-container>
        <v-divider></v-divider>
      </v-card>

      <div>
        <markdown-editor v-if="this.allow_comment === 1" ref="editor" v-model="editor_content" height="500px"
                         :hooks="this.hooks"/>
      </div>
      <br/>
      <v-row v-if="this.allow_comment === 1" justify="end" style="margin-right: 10px;">
        <v-btn raised color="light-blue darken-2" @click="handleComment()">发布</v-btn>
      </v-row>
      <br/>
      <post-issue
        v-show="dialogVisible"
        :dialogVisible="dialogVisible"
        :editMode="true"
        :issue_id="this.issue_id"
        @updateEvent="initissueInfo(this.issue_id)"
        @closeDialogEvent="closeDialog"
      >
      </post-issue>
      <Confirm ref="confirm">

      </Confirm>
      <RelateDialog :relate="relate" :id="Number(issue_id)" @close-dialog="onCloseRelate"
                    :allow_relate="allow_relate"
                    :items="asitems"
                    @update-dialog="getAsList"
                    :list_length="asListLen"
      ></RelateDialog>

      <el-dialog
        title="选择问题标签"
        :show-close="false"
        :visible.sync="tag_dialog"
        :closeOnClickModal="false"
        :closeOnPressEscape="false"
        :closeOnHashChange="false"
        width="30%">
        <el-select v-model="added_tags"
                   class="added_tags" filterable multiple collapse-tags
                   :multiple-limit="5" placeholder="选择标签">
          <el-option v-for="tag in all_tags"
                     :key="tag.tag_id" :label="tag.content" :value="tag.tag_id"/>
        </el-select>
        <span slot="footer" class="dialog-footer">
                    <el-button class="confirm-button" @click.stop="addTags">确 认</el-button>
                </span>
      </el-dialog>
    </v-app>
  </div>
</template>

<script>
//刷新回退上一页面
//数字
import MarkdownEditor from '@/components/MarkdownEditor'
import MyRichText from "@/views/issueInfo/components/MyRichText";
import postIssue from "@/views/postIssue/components/postIssue";
import marked from 'marked';
import Confirm from "@/views/issueInfo/components/Confirm";
import RelateDialog from "@/components/RelateIssue/RelateDialog";
import {
  get_issue_detail,
  like_issue,
  follow_issue,
  check_follow_issue,
  check_like_issue,
  cancel_issue,
  adopt_issue,
  reject_issue,
  agree_issue,
  review_issue,
  readopt_issue,
  classify_issue
} from "@/api/issue";
import {get_issue_all_comments, create_comment, delete_comment} from "@/api/forum";
import {get_all_tags} from '@/api/tag';
import {getToken, getRole} from '@/utils/auth';
import {upload_public} from "@/api/upload";
import DOMPurify from "dompurify";
import {get_association} from "@/api/issue_connect";

export default {
  name: "issueInfoDetail",
  components: {MarkdownEditor, MyRichText, postIssue, marked, Confirm, RelateDialog},
  props: {},
  data() {
    return {
      items2: [
        {
          id: 1,
          color: 'info',
          icon: 'mdi-information',
        },
        {
          id: 2,
          color: 'error',
          icon: 'mdi-alert-circle',
        },
      ],
      isLoading: true,
      confirmText: {
        close: "确认关闭该问题吗？该操作不可逆，请您确认操作。",
        reject: '确认拒绝辅导师回答吗？该操作不可逆，请您确认操作。',
        agree: '确认同意辅导师回答吗？该操作不可逆，请您确认操作。',
        adopt: '确认认领该问题吗？该操作不可逆，请您确认操作。',
        review: '确认复审该问题吗？该操作不可逆，请您确认操作。',
        readopt: '确认重新认领该问题吗？该操作不可逆，请您确认操作。',
        validIssue: '确认判定问题为有效问题吗？该操作不可逆，请您确认操作。',
        invalidIssue: '确认判定问题为无效问题吗？该操作不可逆，请您确认操作。'
      },
      status_trans_permit: [0, 0, 0, 0, 0, 0, 0],
      allow_comment: 0,
      user_type: getRole(),
      dialogVisible: false,
      issue_id: 2,
      title: '',
      content: '',
      html_content: '',
      comment_list: [],
      sanitizedHtml: '',
      user_name: '',
      user_id: 1,
      user_avatar: '',
      counselor_list: [],
      reviewer_list: [],
      items: [],
      chapter_name: '',
      subject_name: '',
      likes: 0,
      follows: 0,
      is_like: 0,
      is_follow: 0,
      status: '',
      anonymous: 0,
      create_at: '',
      update_at: '',
      score: 0,
      tag_list: [],
      tag_dialog: false,
      all_tags: [],
      added_tags: [],
      asitems:[],
      asListLen:0,
      editorText: "发布你的回答",
      editorOptions: {},
      pageSize: 10,
      currentPage: 1,
      relate: false,
      allow_relate: 0,
      hooks: {
        addImageBlobHook: async (blob, callback) => {
          let jwt = this.$store.state.user.token
          const formData = new FormData();
          formData.append('file', blob);
          //callback('http://shieask.com/pic/1.png');
          upload_public(formData).then(response => {
            if (response.data) {
              callback(response.data.url);
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
      },
      editor_content: '发表你的评论和回答',
    }
  },
  methods: {
    santinize(html) {
      return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['p', 'a', 'b', 'i', 'strong', 'em', 'br', 'img', 'blockquote'],
        ALLOWED_ATTR: ['src']
      });
    },
    openConfirm(inText, confirm) {
      this.$refs.confirm.open({
        text: inText,
        onConfirm: confirm
      })
    },
    initIssueId() {
      this.issue_id = this.$route.query.issue_id
    },
    initLike(id) {
      let jwt = this.$store.state.user.token
      check_like_issue(jwt, id).then(response => {
          this.is_like = response.data['is_like'];
          this.likes = response.data['like_count'];
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
    initFollow(id) {
      let jwt = this.$store.state.user.token
      check_follow_issue(jwt, id).then(response => {
          this.is_follow = response.data['is_follow'];
          this.follows = response.data['follow_count'];
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
    initissueInfo(id) {
      let jwt = this.$store.state.user.token
      get_issue_detail(jwt, id).then(response => {
        this.title = response.data.title
        this.content = response.data.content
        this.html_content = marked.parse(this.content)
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
        this.allow_comment = response.data.allow_comment
        this.status_trans_permit = response.data.status_trans_permit
        this.score = response.data.score
        this.tag_list = response.data.tag_list
        this.allow_relate = response.data.allow_relate
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
    initissueComment(id) {
      let jwt = this.$store.state.user.token
      get_issue_all_comments(jwt, id).then(response => {
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
        this.is_like = response.data.is_like;
        this.likes = response.data.like_count;
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
      //localStorage.removeItem('issue_id')
      this.$router.go(-1)
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      });
    },
    collect() {
      let jwt = this.$store.state.user.token
      follow_issue(jwt, this.issue_id).then(response => {
        this.is_follow = response.data['is_follow'];
        this.follows = response.data['follow_count'];
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
      this.dialogVisible = true
    },
    //下面是各种状态转换
    close() {
      let jwt = this.$store.state.user.token
      cancel_issue(jwt, this.issue_id).then(response => {
        this.initAll(this.issue_id)
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
          type: 'error',
          duration: 2000
        })
      })
    },
    adopt() {
      let jwt = this.$store.state.user.token
      adopt_issue(jwt, this.issue_id).then(response => {
        this.initAll(this.issue_id)
        this.$notify({
          title: '认领问题',
          message: '认领问题成功',
          type: 'success',
          duration: 2000
        })
      }).catch(err => {
        this.$notify({
          title: '认领失败',
          message: '认领问题失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    reject() {
      let jwt = this.$store.state.user.token
      reject_issue(jwt, this.issue_id).then(response => {
        this.initAll(this.issue_id)
        this.$notify({
          title: '拒绝回答',
          message: '拒绝回答成功',
          type: 'success',
          duration: 2000
        })
      }).catch(err => {
        this.$notify({
          title: '拒绝回答',
          message: '拒绝回答失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    agree() {
      let jwt = this.$store.state.user.token
      agree_issue(jwt, this.issue_id).then(response => {
        this.initAll(this.issue_id)
        this.$notify({
          title: '同意回答',
          message: '同意回答成功',
          type: 'success',
          duration: 2000
        })
      }).catch(err => {
        this.$notify({
          title: '同意回答',
          message: '同意回答失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    review() {
      let jwt = this.$store.state.user.token
      review_issue(jwt, this.issue_id).then(response => {
        this.initAll(this.issue_id)
        this.$notify({
          title: '认领复审',
          message: '认领复审成功',
          type: 'success',
          duration: 2000
        })
      }).catch(err => {
        this.$notify({
          title: '认领复审',
          message: '认领复审失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    readopt() {
      let jwt = this.$store.state.user.token
      readopt_issue(jwt, this.issue_id).then(response => {
        this.initAll(this.issue_id)
        this.$notify({
          title: '重新认领',
          message: '重新认领成功',
          type: 'success',
          duration: 2000
        })
      }).catch(err => {
        this.$notify({
          title: '重新认领',
          message: '重新认领失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    validIssue() {
      let jwt = this.$store.state.user.token
      classify_issue(jwt, this.issue_id, 1).then(response => {
        this.initAll(this.issue_id)
        this.$notify({
          title: '有效问题',
          message: '判定有效问题',
          type: 'success',
          duration: 2000
        })
        get_all_tags(getToken()).then(response => {
          this.all_tags = response.data['tag_list']
          this.tag_dialog = true
          this.$notify({
            title: '添加标签',
            message: '添加标签成功',
            type: 'success',
            duration: 2000
          })
        }).catch(error => {
          this.$notify({
            title: '添加标签',
            message: '添加标签失败',
            type: 'error',
            duration: 2000
          })
        })
      }).catch(err => {
        this.$notify({
          title: '有效问题',
          message: '判定有效问题失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    invalidIssue() {
      let jwt = this.$store.state.user.token
      classify_issue(jwt, this.issue_id, 0).then(response => {
        this.initAll(this.issue_id)
        this.$notify({
          title: '无效问题',
          message: '判定无效问题',
          type: 'success',
          duration: 2000
        })
      }).catch(err => {
        this.$notify({
          title: '无效问题',
          message: '判定无效问题失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    handleComment() {
      const html = this.$refs.editor.getHtml();
      let jwt = this.$store.state.user.token
      create_comment(jwt, this.issue_id, html).then(response => {
        this.editor_content = ''
        this.initissueComment(this.issue_id)
      }).catch(err => {
        this.$notify({
          title: '发表失败',
          message: 'comment发表失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    addTags() {
      // TODO: call backend
      this.tag_dialog = false;
    },
    initAll(id) {
      // this.initLike(id)
      // this.initFollow(id)
      // this.initissueInfo(id)
      // this.initissueComment(id)
      this.isLoading = true
      Promise.all([this.initLike(id), this.initFollow(id), this.initissueInfo(id), this.initissueComment(id),this.getAsList(id)])
        .then(() => {
          this.isLoading = false
        })
        .catch(() => {
          this.$notify({
            title: '获取信息失败',
            message: '获取信息失败',
            type: 'warning',
            duration: 2000
          })
        })
    },
    //beta
    showRealte() {
      this.relate = true
    },
    onCloseRelate() {
      this.relate = false
    },
    getAsList() {
      let jwt = this.$store.state.user.token
      get_association(jwt, this.issue_id).then(response => {
        this.asListLen = response.data.issue_list.length
        let originData = response.data.issue_list
        let divide = {divider: true, inset: true}
        let o
        this.$nextTick(() => {
          this.asitems = []
          for (o in originData) {
            this.asitems.push(originData[o])
            this.asitems.push(divide)
          }
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      })
    },
  },
  computed: {
    likeIconColor() {
      if (this.is_like === 1) {
        return "pink"
      } else {
        return "black"
      }
    },
    followIconColor() {
      if (this.is_follow === 1) {
        return "pink"
      } else {
        return "black"
      }
    },
    totalPages() {
      return Math.ceil(this.comment_list.length / this.pageSize); // 总页数
    },
    currentPageItems() {
      const start = (this.currentPage - 1) * this.pageSize; // 当前页的起始项索引
      const end = start + this.pageSize; // 当前页的结束项索引
      return this.comment_list.slice(start, end); // 返回当前页的时间线项
    },
  },
  created() {
    let id = -1
    if (!localStorage.getItem('issue_id')) {
      this.initIssueId()
      id = this.$route.query.issue_id
      localStorage.setItem('issue_id', this.$route.query.issue_id)
    } else {
      id = localStorage.getItem('issue_id')
      this.issue_id = Number(localStorage.getItem('issue_id'))
    }

    this.initAll(id)
  },
  beforeDestroy() {
    // 从LocalStorage中移除数据
    localStorage.removeItem('issue_id')
  },
  watch: {
    $route(to, from) {
      // 当路由发生变化时，执行你需要的操作
      localStorage.removeItem('issue_id')
      let anid = this.$route.query.issue_id
      localStorage.setItem('issue_id', this.$route.query.issue_id)
      this.initIssueId()
      this.initAll(anid)
    },
  },
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.added_tags {
  width: 90%;
  margin-left: 5%;
}

.confirm-button {
  background-color: #1687A7;
  border-color: #1687A7;
  color: white;
}
</style>
