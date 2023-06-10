<template>
  <div class="app-container">
      <el-row>
        <el-col :span="19">
        <el-switch style="float: right; margin-bottom: 30px;"
            v-model="is_current_year"
            active-text="本学期问题"
            inactive-text="以往学期问题"
            active-color="#146c94"
            inactive-color="#afd3e2"
            @change="changeYear">
        </el-switch>
        <v-card class="search-bar">
            <el-row style="width: 100%;">
            <el-col :span="22">
              <div class="search-info">
                <el-input v-model="search_keyword"
                        placeholder="请输入关键词" class="search-keyword"/>
                <div class="search-options">
                    <!-- <el-select v-model="search_tags" class="search-tags"
                        filterable multiple collapse-tags :multiple-limit="3"
                        placeholder="请输入标签" style="width: 100%;">
                        <el-option v-for="tag in all_tags"
                            :key="tag.tag_id" :label="tag.content" :value="tag.tag_id"/>
                    </el-select> -->
                    <el-select v-model="sort_order" class="search-select"
                              placeholder="排序方式">
                      <el-option v-for="order in all_orders"
                                :key="order.order_id" :label="order.name" :value="order.order_id"/>
                    </el-select>
                    <el-select v-model="search_state" v-if="this.user_type !== 0"
                              class="search-select" filterable multiple collapse-tags
                              :multiple-limit="6" placeholder="问题状态">
                      <el-option v-for="state in all_status"
                                :key="state.status_id" :label="state.name" :value="state.status_id"/>
                    </el-select>
                    <el-select v-model="search_year" class="search-select"
                               placeholder="学年" @change="updateSearchYear" v-if="is_current_year === false">
                      <el-option v-for="year in all_years"
                                 :key="year.year_id" :label="year.content" :value="year.year_id"/>
                    </el-select>
                    <el-select v-model="search_subject" class="search-select"
                              placeholder="科目" @change="clearSubject">
                      <el-option v-for="subject in all_subjects"
                                :key="subject.subject_id" :label="subject.name" :value="subject.subject_id"/>
                    </el-select>
                    <el-select v-show="this.search_subject !== 0 && this.search_subject !== null"
                              v-model="search_chapter"
                              filterable multiple collapse-tags :multiple-limit="6"
                              class="search-select" placeholder="章节">
                      <el-option v-for="chapter in all_chapters[this.search_subject]"
                                :key="chapter.chapter_id" :label="chapter.name" :value="chapter.chapter_id"/>
                    </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="2" style="height: 96px;">
              <el-button icon="el-icon-search" class="search-button"
                        @click="search" v-loading.fullscreen.lock="listLoading"/>
            </el-col>
            </el-row>
        </v-card>
        <v-card class="issues-table">
            <!--在这里应该最多传三个tag进去，不然显示不了 -->
            <!-- tags 目前还没有 -->
            <IssueItem
            v-for="issue in issues"
            :id="issue.issue_id"
            :title="issue.issue_title"
            :user_name="issue.user_name"
            :user_avatar="issue.user_avatar"
            :abstract="issue.content.length > 16 ?
                      issue.content.slice(0, 15) + '...' :
                      issue.content"
            :created_at="issue.created_at.slice(0, 10)"
            :subject="issue.subject_name"
            :chapter="issue.chapter_name"
            :tags="issue.tags"
            :status_trans_permit="issue.status_trans_permit"
            :status="issue.status"
            @refreshEvent="refresh"
            />
            <el-pagination small layout="prev, pager, next"
                :page-size="this.page_size" :total="total_page * page_size" :current-page.sync="cur_page"
                @prev-click="toPrevPage" @next-click="toNextPage" @current-change="toSomePage">
            </el-pagination>
        </v-card>
        </el-col>
        <el-col :span="5">
          <h2>热门列表</h2>
          <el-divider></el-divider>
          <div style="display: flex;">
            <v-icon left style="margin-bottom: 0px; color: #9fc3d2;">mdi-poll</v-icon>
            <h3>热搜问题</h3>
          </div>
          <v-card class="top-list">
          <TopIssue
            v-for="issue in top_issues"
            :id="issue.issue_id"
            :title="issue.title"
            :subject="issue.subject_name"
            :chapter="issue.chapter_name"
            :rank="issue.rank"></TopIssue>
          </v-card>
          <div style="display: flex; margin-top: 60px;">
            <v-icon left style="margin-bottom: 0px; color: #9fc3d2;">mdi-poll</v-icon>
            <h3>活跃用户</h3>
          </div>
          <v-card class="top-list">
          <TopUser
            v-for="user in top_users"
            :id="user.user_id"
            :name="user.name"
            :avatar="user.avatar"
            :rank="user.rank"></TopUser>
          </v-card>
        </el-col>
      </el-row>
</div>
</template>

<script>
import {Message} from 'element-ui'
import IssueItem from "./components/issueItem.vue";
import TopIssue from "./components/topIssue.vue";
import TopUser from "./components/topUser.vue";
import {search_issue} from '@/api/issue'
import {get_all_tags} from '@/api/tag'
import {get_all_subjects, get_subject_all_chapters} from '@/api/subject'
import {getToken, getRole} from '@/utils/auth'
import {get_active_users, get_popular_issues} from '@/api/hot_list'
import {get_all_years} from '@/api/year'

export default {
  name: "Search",
  components: {
      IssueItem,
      TopIssue,
      TopUser
  },
  props: {
  },
  setup() {
  },
  data() {
      return {
          dialogVisible: false,
          user_type: getRole(),
          is_current_year: true,
          search_year: null,
          search_keyword: '',
          search_tags: [],
          search_state: null,
          search_subject: null,
          search_chapter: [],
          sort_order: null,
          current_year_id: 1, // alpha 阶段先用固定的year_id, beta
          all_tags: [
              {
                  tag_id: 1,
                  content: '作业题'
              },
              {
                  tag_id: 2,
                  content: '答案勘误'
              },
              {
                  tag_id: 3,
                  content: '踩坑分享'
              },
              {
                  tag_id: 4,
                  content: 'debug'
              },
          ],
          all_years: [
            {
              year_id: 1,
              content: '2023春季学期'
            }
          ],
          all_subjects: [
              {
                  subject_id: 1,
                  name: '数学分析',
                  content: '课程介绍'
              },
              {
                  subject_id: 2,
                  name: '大学物理',
                  content: '课程介绍'
              },
              {
                  subject_id: 3,
                  name: '数据结构',
                  content: '课程介绍'
              },
              {
                  subject_id: 4,
                  name: '离散数学',
                  content: '课程介绍'
              },
          ],
          all_chapters: {
              1: [
                  {
                      chapter_id: 0,
                      name: '未分类',
                      content: '章节说明'
                  },
                  {
                      chapter_id: 1,
                      name: '级数',
                      content: '章节说明'
                  },
                  {
                      chapter_id: 2,
                      name: '傅里叶变换',
                      content: '章节说明'
                  },
                  {
                      chapter_id: 3,
                      name: '多元微分',
                      content: '章节说明'
                  },
              ],
              2: [
                {
                  chapter_id: 4,
                  name: '未分类',
                  content: '章节说明'
                },
                {
                  chapter_id: 5,
                  name: '力学',
                  content: '章节说明'
                },
                {
                  chapter_id: 6,
                  name: '电磁学',
                  content: '章节说明'
                },
                {
                  chapter_id: 7,
                  name: '近代物理',
                  content: '章节说明'
                },
              ],
              3: [
                {
                  chapter_id: 8,
                  name: '未分类',
                  content: '章节说明'
                },
                {
                  chapter_id: 9,
                  name: '可持久化线段树',
                  content: '章节说明'
                },
                {
                  chapter_id: 10,
                  name: '字典树',
                  content: '章节说明'
                },
                {
                  chapter_id: 11,
                  name: '堆',
                  content: '章节说明'
                },
              ],
              4: [
                {
                  chapter_id: 12,
                  name: '未分类',
                  content: '章节说明'
                },
                {
                  chapter_id: 13,
                  name: '公理系统',
                  content: '章节说明'
                },
                {
                  chapter_id: 14,
                  name: '形式逻辑',
                  content: '章节说明'
                },
                {
                  chapter_id: 15,
                  name: '谓词逻辑',
                  content: '章节说明'
                },
              ]
          },
          all_issues: [
              {
                  id: 'issue0',
                  issue_title: '对数分答案的异议',
                  user_name: '学生A',
                  abstract: '怀疑书上这道积分题答案有误。如下是我的...',
                  created_at: '2022-08-08 00:00',
                  subject_name: '数学分析',
                  chapter_name: '不定积分',
                  tags: ['作业题', '答案勘误'],
                  follow_count: 5
              },
              {
                  id: 'issue1',
                  issue_title: '哈夫曼树作业bug',
                  user_name: '学生B',
                  abstract: '做哈夫曼树的作业时遇到了问题。对于输入...',
                  created_at: '2022-09-09 00:00',
                  subject_name: '数据结构',
                  chapter_name: '树',
                  tags: ['debug'],
                  follow_count: 2
              },
              {
                  id: 'issue2'
              },
              {
                  id: 'issue3'
              },
              {
                  id: 'issue4'
              },
              {
                  id: 'issue5'
              },
              {
                  id: 'issue6'
              }],
          all_status: [
            {
              status_id: 0,
              name: '未认领回答'
            },
            {
              status_id: 1,
              name: '已认领回答'
            },
            {
              status_id: 2,
              name: '未认领复审'
            },
            {
              status_id: 3,
              name: '已认领复审'
            },
            {
              status_id: 4,
              name: '有效提问'
            },
            {
              status_id: 5,
              name: '无效提问'
            },
          ],
          all_orders: [
            {
              order_id: 0,
              name: '最近优先'
            },
            {
              order_id: 1,
              name: '最早优先'
            },
            {
              order_id: 2,
              name: '最热优先'
            },
            {
              order_id: 3,
              name: '综合排序'
            },
          ],
          listLoading: false,
          cur_page: 1,
          total_page: 2,
          page_size: 7,
          issues: [],
          top_k : 5,
          top_issues: [],
          top_users: [],
      };
  },
  methods: {
      clearSubject() {
          this.search_chapter = []
      },
      handleClickPost() {
          this.dialogVisible = true;
      },
      closeDialog(refresh = false) {
          this.dialogVisible = false;
          if (refresh === true) {
            this.search()
          }
      },
      changeYear() {
          this.search()
      },
      updateSearchYear() {
          this.initChapters();
          this.search_subject = null;
          this.clearSubject();
      },
      search() {
          if (this.is_current_year) {
            this.search_year = this.current_year_id;
          }
          if (this.sort_order === null) {
            this.sort_order = 0
          }
          if (this.user_type === 0) {
            this.search_state = [4]
          }
          this.listLoading = true;
          search_issue(getToken(), this.search_keyword, this.search_tags,
            this.search_state, this.search_chapter, this.sort_order,
            this.cur_page, this.page_size, this.search_year, this.search_subject).then(response => {
              this.issues = response.data['issue_list']
              this.total_page = response.data['total_page']
              this.listLoading = false
              Message({
                message: '搜索完成',
                type: 'success',
              })
            setTimeout(() => {
              this.listLoading = false
            }, 10 * 1000)
          }).catch(error => {
            console.log(error)
          })
      },
      initTags() {
          get_all_tags(getToken()).then(response => {
            this.all_tags = response.data['tag_list']
          }).catch(error => {
          })
      },
      initYears() {
        get_all_years(getToken()).then(response => {
          this.all_years = response.data['year_list'];
          this.current_year_id = response.data['current_year_id'];
          get_all_subjects(getToken(), this.current_year_id).then(response => {
            // why should JSON? see https://blog.csdn.net/weixin_46331416/article/details/123262798
            this.all_subjects = JSON.parse(JSON.stringify(response.data['subject_list']));
            // this.all_subjects = response.data['subject_list']
            let i = 0;
            for (i = 0; i < this.all_subjects.length; i++) {
              // Warning！in each loop, for only calls api, not wait the response but direct go for next loop,
              // so we should store var i in case of having wrong value in response handling code
              let tmpI = i;
              get_subject_all_chapters(getToken(), this.all_subjects[tmpI].subject_id).then(
                response => {
                  this.all_chapters[this.all_subjects[tmpI].subject_id] = response.data['chapter_list']
                }
              ).catch(error => {
              })
            }
          }).catch(error => {
          })
        }).catch(error => {
          console.log(error)
        })
      },
      initChapters() {
        get_all_subjects(getToken(), this.search_year).then(response => {
          // why should JSON? see https://blog.csdn.net/weixin_46331416/article/details/123262798
          this.all_subjects = JSON.parse(JSON.stringify(response.data['subject_list']));
          // this.all_subjects = response.data['subject_list']
          let i = 0;
          for (i = 0; i < this.all_subjects.length; i++) {
            // Warning！in each loop, for only calls api, not wait the response but direct go for next loop,
            // so we should store var i in case of having wrong value in response handling code
            let tmpI = i;
            get_subject_all_chapters(getToken(), this.all_subjects[tmpI].subject_id).then(
              response => {
                this.all_chapters[this.all_subjects[tmpI].subject_id] = response.data['chapter_list']
              }
            ).catch(error => {
            })
          }
        }).catch(error => {
        })
      },

    getTops() {
        get_popular_issues(getToken(), this.top_k).then(response => {
          this.top_issues = response.data['issue_list'];
          for (var i = 0; i < this.top_issues.length; ++i) {
            this.top_issues[i].rank = i + 1;
          }
        }).catch(error => {
        })
        get_active_users(getToken(), this.top_k).then(response =>{
          this.top_users = response.data['user_list'];
          for (var i = 0; i < this.top_users.length; ++i) {
            this.top_users[i].rank = i + 1;
          }
        }).catch(error => {
        })
      },

      refresh() {
        this.search();
      },

      getIssues() {
          this.search()
      },

      toPrevPage() {
          if (this.cur_page !== 1) {
              this.cur_page -= 1;
              this.search();
          }
      },

      toNextPage() {
          if (this.cur_page !== this.total_page) {
              this.cur_page += 1;
              this.search();
          }
      },

      toSomePage() {
          this.search();
      }
  },
  created() {
      this.initTags();
      this.initYears();
      this.getTops();
      this.getIssues();
  },
  computed: {
  },
}
</script>

<style scoped>

.search-bar {
  display: flex;
  width: 84%;
  margin-left: 10%;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 20px 30px 20px 30px;
}

.search-info {
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-right: 5%;
}

.search-options {
  display:flex;
}

.search-button {
  width: 100%;
  margin-top: 0px;
  height: inherit;
  color: #666666;
  min-width: 48px;
}

.search-keyword {
  height: 60px;
  font-size: 19px;
  font-family:"黑体";
}

.search-keyword .el-input__wrapper {
  height: 38px !important;
  padding: auto 5px auto auto !important;
}

.search-keyword .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.search-tags {
  width: 31% !important;
  padding-right: 3%;
}

.search-select {
  /* width: 14%; */
  /* margin-left: 1%; */
  width: 20%;
  margin-right: 3%;
}

.search-select /deep/ .el-select__tags {
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  flex-wrap: nowrap;
}

.search-select /deep/ .el-select__tags-text {
  display: inline-block;
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.issues-table {
  width: 84%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 10%;
  margin-top: 30px;
}

.top-list {
  height: 410px;
  width: 100%;
  padding-top: 5px;
}

h2 {
  margin-top: 150px;
  font-weight: 800;
  font-size: 24px;
}

h3 {
  margin: 10px 0px 10px 0px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
}
</style>
