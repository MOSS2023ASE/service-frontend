<template>
  <el-table
    :data="issueList"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="提出时间"
      sortable
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="问题名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
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
import { get_adopt_issue, get_ask_issue, get_follow_issue, get_review_issue } from '@/api/user'
import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        ask_issue: [],
        review_issue: [],
        adopt_issue: [],
        follow_issue: []
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
        getAskIssue() {
          get_ask_issue(getToken(),
                        0,
                        10).then(response => {
                          console.log('查询提问issue成功');
                          this.ask_issue = response.data.issue_list;
                        }).catch(error => {
                          console.log(error);
                          console.log('查询提问issue失败');
                        });
        },
        getReviewIssue() {
          get_review_issue(getToken(),
                          0,
                          10).then(response => {
                            console.log('查询认领复审的issue');
                            this.review_issue = response.data.issue_list;
                          }).catch(error => {
                            console.log(error);
                            console.log('查询认领复审的issue失败');
                          });
        },
        getAdoptIssue() {
          get_adopt_issue(getToken(),
                          0,
                          10).then(response => {
                            console.log('查询认领的issue成功');
                            this.adopt_issue = response.data.issue_list;
                          }).catch(error => {
                            console.log(error);
                            console.log('查询认领的issue失败');
                          });
        },
        getFollowIssue() {
          get_follow_issue(getToken(),
                          0,
                          10).then(response => {
                            console.log('查询收藏的issue成功');
                            this.follow_issue = response.data.issue_list;
                          }).catch(error => {
                            console.log(error);
                            console.log('查询收藏的issue失败');
                          });
        }
    },
    mounted() {
      this.getAskIssue();
      this.getFollowIssue();
      this.getAdoptIssue(); 
      this.getReviewIssue();
    }
  }
</script>