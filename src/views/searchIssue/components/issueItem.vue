<template>
  <div class="issue-item" @click="toIssueDetailView()">
    <div class="author">
      <el-avatar v-if="this.user_avatar !== null" class="user_avatar" :src="this.user_avatar" :key="this.user_avatar" />
      <el-avatar v-else class="user_avatar" :src="require('../../../assets/images/anonymous.jpg')" />
      <div class="user_name">{{this.user_name}}</div>
    </div>
    <div class="previews">
      <div style="display: flex;">
        <div style="display: flex; flex-direction: column;">
          <div class="title">{{this.title}}</div>
          <div class="content">{{this.abstract}}</div>
        </div>
        <div class="time-state">
          <div>{{this.created_at.slice(0, 10)}} {{this.created_at.slice(11, 16)}}</div>
          <div v-if="this.status === 0" class="state0">
            [未认领回答]
          </div>
          <div v-if="this.status === 1" class="state1">
            [已认领回答]
          </div>
          <div v-if="this.status === 2" class="state2">
            [未认领复审]
          </div>
          <div v-if="this.status === 3" class="state3">
            [已认领复审]
          </div>
          <div v-if="this.status === 4" class="state4">
            [有效提问]
          </div>
          <div v-if="this.status === 5" class="state5">
            [无效提问]
          </div>
        </div>
      </div>
      <div class="subject-chapter">
        <el-row style="width: 100%">
          <el-col :span="10">
            <el-tag type="warning" class="square-tag">{{ this.subject }}</el-tag>
          </el-col>
          <el-col :span="10">
            <el-tag type="warning" class="square-tag">{{ this.chapter }}</el-tag>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="tags">
      <li class="tag" v-for="tag in this.tags">{{tag}}</li>
    </div>
    <div class="interactions" v-if="this.user_type === 0">
      <div class="like_count">
        <v-icon left>
          mdi-thumb-up-outline
        </v-icon>
        <span style="margin: 0px 0px 4px 5px">{{this.like_count}}</span>
      </div>
      <div class="follow_count">
        <v-icon left>
          mdi-heart-outline
        </v-icon>
        <span style="margin: 0px 0px 4px 5px">{{this.follow_count}}</span>
      </div>
    </div>
    <div class="interactions" @click.stop="">
      <el-button class="inter-button" v-if="this.status_trans_permit[0] === 1"
                 style="issue-button" @click.stop="answerDialogVisible = true">
        认领回答
      </el-button>
      <el-dialog
        title="提示"
        :show-close="false"
        :visible.sync="answerDialogVisible"
        width="30%">
        <span>确认认领回答该问题？</span>
        <span slot="footer" class="dialog-footer">
                    <el-button class="confirm-button" @click.stop="answerIssue">确 认</el-button>
                    <el-button class="cancel-button" @click.stop="answerDialogVisible = false" style="color: #666666;">取 消</el-button>
                </span>
      </el-dialog>
      <el-button class="inter-button" v-if="this.status_trans_permit[4] === 1"
                 style="issue-button" @click.stop="verifyDialogVisible = true">
        认领复审
      </el-button>
      <el-dialog
        title="提示"
        :show-close="false"
        :visible.sync="verifyDialogVisible"
        width="30%">
        <span>确认认领复审该问题？</span>
        <span slot="footer" class="dialog-footer">
                    <el-button @click.stop="verifyDialogVisible = false" style="color: #666666;">取 消</el-button>
                    <el-button type="primary" @click.stop="verifyIssue">确 定</el-button>
                </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import {adopt_issue, review_issue} from '@/api/issue'
import {getToken, getRole} from '@/utils/auth'

export default {
  name: 'IssueItem',
  props: {
    user_type: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 998244353
    },
    title: {
      type: String,
      default: "(无标题)"
    },
    user_name: {
      type: String,
      default: "匿名用户"
    },
    user_avatar: {
      type: String,
      default: '../../../assets/images/anonymous.jpg'
    },
    abstract: {
      type: String,
      default: '这个人什么都没写...'
    },
    tags: {
      type: Array,
      default: () => []
    },
    subject: {
      type: String,
      default: '未定科目'
    },
    chapter: {
      type: String,
      default: '未定章节'
    },
    created_at: {
      type: String,
      default: '2022-09-01 00:00'
    },
    like_count: {
      type: Number,
      default: 0
    },
    follow_count: {
      type: Number,
      default: 0
    },
    status_trans_permit: {
      type: Array,
      default: [0, 0, 0, 0, 0 ,0, 0]
    },
    status: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      answerDialogVisible: false,
      verifyDialogVisible: false
    }
  },
  setup() {
  },
  methods: {
    /* async */ toIssueDetailView() {
      //Test issueInfoDetail
      this.$router.push({name: 'issueInfoDetail', query: {issue_id: this.id}})
    },
    answerIssue() {
      adopt_issue(getToken(), this.id).then(response => {
        console.log(response)
        this.verifyDialogVisible = false
        this.$emit('refreshEvent');
        Message({
          message: '已认领回答问题',
          type: 'success',
        })
      }).catch(error => {
        console.log(error)
      })

    },
    verifyIssue() {
      review_issue(getToken(), this.id).then(response => {
        console.log(response)
        this.verifyDialogVisible = false
        this.$emit('refreshEvent');
        Message({
          message: '已认领复审问题',
          type: 'success',
        })
      }).catch(error => {
        console.log(error)
      })

    }
  }
}
</script>

<style scoped>
.issue-item {
  display: flex;
  cursor: pointer;
  width: 80%;
  height: 140px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 10%;
  transition: all 0.3s;

  border-style: solid;
  border-color: #AAAAAA;
  border-width: 1px;
  border-radius: 0.8ch;
}

.issue-item:hover {
  box-shadow: rgba(100, 100, 111, 0.8) 0px 7px 29px 0px;
}

.author {
  display: flex;
  flex-direction: column;
  padding-top: 13px;
  padding-left: 4%;
  width: 15%;
  min-width: 80px;
}

.previews {
  display: flex;
  flex-direction: column;
  padding-top: 18px;
  padding-left: 2%;
  width: 50%;
}
.tags {
  display:flex;
  flex-direction: column;
  margin-top: 3px;
  padding-top: 10px;
  margin-left: 3%;
  width: 12%;
}

.interactions {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  margin-left: 2%;
  width: 15%;
}

.user_avatar {
  width: 80px;
  height: 80px;
  align-self: center;
  margin-top: 4%;
}

.user_name {
  padding-left: 10%;
  padding-top: 5%;
  color: #444444;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0.8px;
  text-align: center;
}

.title {
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 1.5px;
  display: inline-block;
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content {
  padding-top: 12px;
  color: #666666;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.subject-chapter {
  display: flex;
  height: 40px;
  margin-top: 12px;
}

.square-tag {
  height: 28px;
  margin-right: 20%;
  display: inline-block;
  max-width: 90px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag {
  width: 70px;
  height: 30px;
  margin-top: 5%;
  margin-right: 5%;
  padding-top: 3px;
  padding-bottom: 3px;

  border-style: none;
  border-color: #76a8dd;
  background-color: #76a8dd;
  border-radius: 1.6ch;

  color: #ffffff;
  font-weight: 500;
  text-align: center;
}

.time-state {
  margin-top: 3px;
  margin-left: auto;
  margin-right: 3%;
  color: #444444;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.4px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.state0 {
  margin-top: 5px;
  color: #332e2e;
}

.state1 {
  margin-top: 5px;
  color: #e1b92c;
}

.state2 {
  margin-top: 5px;
  color: #e69be6;
}

.state3 {
  margin-top: 5px;
  color: #3636da;
}

.state4 {
  margin-top: 5px;
  color: #4c9f4c
}

.state5 {
  margin-top: 5px;
  color: #d64646;
}

.like_count {
  display:flex;
  padding-top: 5px;
  font-weight: 500;
  font-size: 22px;
}

.follow_count {
  display:flex;

  padding-top: 30px;
  font-weight: 500;
  font-size: 22px;
}

.inter-button {
  margin-top: 10%;
  margin-bottom: 10%;
  margin-left: 0px;
  margin-right: 10%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #19A7CE;
  border-color: #19A7CE;
  color: white;
}

.inter-button:hover {
  color: black;
}

li {
  list-style-type: none;
}

.confirm-button {
  background-color: #1687A7;
  border-color: #1687A7;
  color: white;
}

.cancel-button {
  background-color: #D3E0EA;
  border-color: #D3E0EA;
  color: black;
}
</style>
