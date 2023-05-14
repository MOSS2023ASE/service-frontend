<template>
  <el-table
    :data="issue_list"
    style="width: 100%"
    :default-sort = "{prop: 'update_at', order: 'descending'}"
    max-height="500px"
  >
    <el-table-column
      prop="update_at"
      label="更新时间"
      sortable
      align="center">
    </el-table-column>
    <el-table-column
      prop="title"
      label="问题名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="status"
      label="问题状态"
      align="center">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">
        <v-btn text color="blue" @click="toIssueDetailView(scope.row.issue_id)">
          <v-icon>mdi-file-document-outline</v-icon>
          <span class="ml-2">查看</span>
        </v-btn>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { get_adopt_issue, get_ask_issue, get_follow_issue, get_review_issue } from '@/api/user';
import { getToken } from '@/utils/auth';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      issue_list: []
    }
  },
  props: ['type'],
  methods: {
    /* async */ toIssueDetailView(issue_id) {
      // TODO: call backend API
      // Test issueInfoDetail
      this.$router.push({name: 'issueInfoDetail', params: {issue_id: issue_id}})
      //
    },
    processIssue() {
      let status_list = ['未认领', '已认领', '未认领复审', '已认领复审', '有效提问', '无效提问'];
      for (let i = 0; i < this.issue_list.length; i++) {
        this.issue_list[i].update_at = this.issue_list[i].update_at.split('.')[0];
        this.issue_list[i].status = status_list[this.issue_list[i].status];
      }
    },
    getAskIssue() {
      get_ask_issue(getToken(),
        1,
        2e9).then(response => {
        this.issue_list = response.data.issue_list;
        this.processIssue();
      }).catch(error => {
        Message({message: '查询提问issue失败', type: 'error'});
      });
    },
    getReviewIssue() {
      get_review_issue(getToken(),
        1,
        2e9).then(response => {
        this.issue_list = response.data.issue_list;
        this.processIssue();
      }).catch(error => {
        Message({message: '查询复审的issue失败', type: 'error'});
      });
    },
    getAdoptIssue() {
      get_adopt_issue(getToken(),
        1,
        2e9).then(response => {
        this.issue_list = response.data.issue_list;
        this.processIssue();
      }).catch(error => {
        Message({message: '查询认领的issue失败', type: 'error'});
      });
    },
    getFollowIssue() {
      get_follow_issue(getToken(),
        1,
        2e9).then(response => {
        this.issue_list = response.data.issue_list;
        this.processIssue();
      }).catch(error => {
        Message({message: '查询收藏的issue失败', type: 'error'});
      });
    }
  },
  mounted() {
    if (this.type === 1) {
      this.getAskIssue();
    } else if (this.type === 2) {
      this.getAdoptIssue();
    } else if (this.type === 3) {
      this.getReviewIssue();
    } else if (this.type === 4) {
      this.getFollowIssue();
    }
  }
}
</script>