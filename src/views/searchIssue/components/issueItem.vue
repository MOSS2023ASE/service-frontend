<template>
  <v-card class="issue-item" @click="toIssueDetailView()" :class="this.status_class[this.status]">
    <el-row style="width: 100%;">
      <el-col :span="4">
        <div class="author">
          <el-avatar v-if="this.user_avatar !== null" class="user_avatar" :src="this.user_avatar" :key="this.user_avatar" />
          <el-avatar v-else class="user_avatar" :src="require('../../../assets/images/anonymous.jpg')" />
          <div class="user_name">{{this.user_name}}</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="previews">
          <div style="display: flex; flex-direction: column;">
            <el-row style="width: 100%">
              <el-col :span="16">
                <div class="title">{{this.title}}</div>
              </el-col>
              <el-col :span="8">
                <div class="time">{{this.created_at}}</div>
              </el-col>
            </el-row>
            <div class="content">{{this.abstract}}</div>
          </div>
          <!-- <el-col :span="9">
            <div class="state">
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
          </el-col> -->
          <div class="subject-chapter">
            <el-row style="width: 100%">
              <el-col :span="12">
                <el-tag type="warning" class="square-tag">{{ this.subject }}</el-tag>
              </el-col>
              <el-col :span="12">
                <el-tag type="warning" class="square-tag">{{ this.chapter }}</el-tag>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="tags">
          <li class="tag" v-for="tag in this.tags">{{tag}}</li>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="state">
            {{ this.status_text[this.status] }}
        </div>
      </el-col>
    </el-row>
  </v-card>
</template>

<script>

export default {
  name: 'IssueItem',
  props: {
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
      default: '2022-09-01'
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
      status_text: [
        '未认领回答',
        '已认领回答',
        '未认领复审',
        '已认领复审',
        '有效提问',
        '无效提问'
      ],
      status_class: [
        'state0',
        'state1',
        'state2',
        'state3',
        'state4',
        'state5'
      ]
    }
  },
  setup() {
  },
  methods: {
    toIssueDetailView() {
      this.$router.push({name: 'issueInfoDetail', query: {issue_id: this.id}})
    },
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
}

.issue-item:hover {
  box-shadow: rgba(100, 100, 111, 0.8) 0px 7px 29px 0px;
}

.author {
  display: flex;
  flex-direction: column;
  padding-top: 13px;
  padding-left: 4%;
  min-width: 80px;
}

.previews {
  display: flex;
  flex-direction: column;
  padding-top: 18px;
  padding-left: 2%;
  padding-right: 2%;
}
.tags {
  display:flex;
  flex-direction: column;
  margin-top: 3px;
  padding-top: 10px;
  margin-left: 3%;
  width: 12%;
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
  height: 36px;
  width: 100%;
  letter-spacing: 1.5px;
  display: inline-block;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content {
  padding-top: 12px;
  height: 32px;
  width: 90%;
  color: #666666;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  max-width: 250px;
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
.time {
  margin-top: 5px;
  color: #444444;
  font-weight: 400;
  font-size: 14px;
  font-family: Arial;
  letter-spacing: 0.4px;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.state {
  margin-top: 10px;
  margin-left: auto;
  margin-right: 6px;
  font-weight: 500;
  font-size: 15px;
  font-family: '黑体';
  color: #ffffff;
  letter-spacing: 1px;
  width: 20px;
}

.state0 {
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgba(20, 35, 72, 1))
}

.state5 {
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgba(43, 49, 44, 1))
}

.state2 {
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgba(23, 129, 181, 1))
}

.state3 {
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgba(19, 72, 87, 1))
}

.state1 {
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgba(21, 85, 154, 1))
}

.state4 {
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgba(34, 148, 83, 1))
}

li {
  list-style-type: none;
}
</style>
