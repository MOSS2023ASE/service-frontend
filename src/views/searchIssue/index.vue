<template>
    <div class="app-container">
        <el-header height="100">
            <el-button type="danger" v-show="user_type === 0" @click="handleClickPost"
                        class="post-issue-button">
                发布问题
            </el-button>
        </el-header>
        <div>
            <PostIssue
                v-show="dialogVisible"
                :dialogVisible="dialogVisible"
                @closeDialogEvent="closeDialog" />
        </div>
        <div class="search-bar">
            <div class="search-info">
                <el-input v-model="search_keyword"
                        placeholder="请输入关键词" class="search-keyword"/>
                <div class="search-options">
                    <el-select v-model="search_tags" class="search-tags"
                        filterable multiple :multiple-limit="3"
                        placeholder="请输入标签" style="width: 100%;">
                        <el-option v-for="tag in all_tags"
                            :key="tag.tag_id" :label="tag.content" :value="tag.tag_id"/>
                    </el-select>
                  <el-select v-model="sort_order" class="search-select"
                             placeholder="排序方式">
                    <el-option v-for="order in all_orders"
                               :key="order.order_id" :label="order.name" :value="order.order_id"/>
                  </el-select>
                    <el-select v-model="search_state" class="search-select"
                               filterable multiple :multiple-limit="6"
                               placeholder="问题状态">
                      <el-option v-for="state in all_status"
                                 :key="state.status_id" :label="state.name" :value="state.status_id"/>
                    </el-select>
                    <el-select v-model="search_subject" class="search-select"
                               placeholder="科目">
                      <el-option v-for="subject in all_subjects"
                                 :key="subject.subject_id" :label="subject.name" :value="subject.subject_id"/>
                    </el-select>
                    <el-select v-show="this.search_subject !== 0 && this.search_subject !== null"
                               v-model="search_chapter"
                               filterable multiple :multiple-limit="6"
                               class="search-select" placeholder="章节">
                      <el-option v-for="chapter in all_chapters[this.search_subject]"
                                 :key="chapter.chapter_id" :label="chapter.name" :value="chapter.chapter_id"/>
                    </el-select>
                </div>
            </div>
            <el-button icon="el-icon-search" style="width: 8%; height: inherit;" @click="search">搜索</el-button>
        </div>
        <div class="issues-table">
            <!--在这里应该最多传三个tag进去，不然显示不了 -->
            <!-- abstract tags issue_like_count issue_comment_count 目前还没有 -->
            <IssueItem
            v-for="issue in issues"
            :user_type="user_type"
            :id="issue.issue_id"
            :title="issue.issue_title"
            :user_name="issue.user_name"
            :user_avatar="issue.user_avatar"
            :abstract="issue.abstract"
            :issue_time="issue.issue_time"
            :subject="issue.subject_name"
            :chapter="issue.chapter_name"
            :tags="issue.tags"
            :issue_like_count="issue.issue_like_count"
            :issue_comment_count="issue.issue_comment_count"
            />
            <el-pagination small layout="prev, pager, next"
                :page-size="this.page_size" :total="issue_count"
                @prev-click="toPrevPage" @next-click="toNextPage">
            </el-pagination>
        </div>
</div>
</template>

<script>
import IssueItem from "./components/issueItem.vue";
import PostIssue from "./components/postIssue.vue";
import {Message} from 'element-ui'
import {search_issue} from '@/api/issue'
import {get_all_tags} from '@/api/tag'
import {get_all_subjects, get_subject_all_chapters} from '@/api/subject'
import {getToken} from '@/utils/auth'

export default {
    name: "Search",
    components: {
        IssueItem,
        PostIssue
    },
    props: {
    },
    setup() {
    },
    data() {
        return {
            dialogVisible: false,
            user_type: 1,
            search_keyword: '',
            search_tags: [],
            search_state: null,
            search_subject: null,
            search_chapter: null,
            sort_order: null,
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
                    issue_time: '2022-08-08',
                    subject_name: '数学分析',
                    chapter_name: '不定积分',
                    tags: ['作业题', '答案勘误'],
                    issue_like_count: 5,
                    issue_comment_count: 5
                },
                {
                    id: 'issue1',
                    issue_title: '哈夫曼树作业bug',
                    user_name: '学生B',
                    abstract: '做哈夫曼树的作业时遇到了问题。对于输入...',
                    issue_time: '2022-09-09',
                    subject_name: '数据结构',
                    chapter_name: '树',
                    tags: ['debug'],
                    issue_like_count: 8,
                    issue_comment_count: 2
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
            issue_count: 7,
            cur_page: 1,
            total_page: 2,
            page_size: 5,
            issues: [],
        };
    },
    methods: {
        handleClickPost() {
            this.dialogVisible = true;
        },
        closeDialog() {
            console.log('click');
            this.dialogVisible = false;
        },
        search() {

            if (this.sort_order === null) {
              this.sort_order = 0
            }
            search_issue(getToken(), this.search_keyword, this.search_tags,
              this.search_state, this.search_chapter, this.sort_order,
              this.cur_page, this.page_size).then(response => {
                console.log('success')
                this.issues = response.data['issue_list']
                this.total_page = response.data['total_page']
              setTimeout(() => {
                this.listLoading = false
              }, 1.5 * 1000)
            })
            Message({
                message: '搜索',
                type: 'success',
            })
        },
        initTags() {
            get_all_tags(getToken()).then(response => {
              console.log('获取标签成功')
              this.all_tags = response.data['tag_list']
            }).catch(error => {
              console.log('获取标签失败')
              console.log(error)
            })
        },
      initChapters() {
        get_all_subjects(getToken()).then(response => {
          console.log('获取科目成功')
          this.all_subjects = response.data['subject_list']
        }).catch(error => {
          console.log('获取科目失败')
          console.log(error)
        })
        let i = 0;
        for (i = 0; i < this.all_subjects.length; i++) {
          get_subject_all_chapters(getToken(), this.all_subjects[i].subject_id).then(
            response => {
              this.all_chapters[this.all_subjects[i].subject_id] = response.data['chapter_list']
            }
          ).catch(error => {
            console.log('获取章节失败')
            console.log(error)
          })
        }
      },
        getIssues() {
            // TODO: get issues and issue_count
            this.issues = this.all_issues.slice(0, 5);
        },

        toPrevPage() {
            // TODO
            if (this.cur_page !== 1) {
                this.issues = this.all_issues.slice((this.cur_page - 2) * 5, (this.cur_page - 1) * 5);
                this.cur_page -= 1;
                this.search();
            }
        },

        toNextPage() {
            // TODO
            if (this.cur_page !== this.total_page) {
                this.issues = this.all_issues.slice(this.cur_page * 5, (this.cur_page + 1) * 5);
                this.cur_page += 1;
                this.search();
            }
        }
    },
    created() {
        // TODO: get user_type
        this.initTags();
        this.initChapters();
        this.getIssues();
    },
    computed: {
    },
}
</script>

<style scoped>

.post-issue-button {
    float: right;
    height: 50px;
    width: 80px;
    padding: 0px;
    font-size: 15px;
    color: white;
}

.search-bar {
    display: flex;
    width: 80%;
    margin-left: 10%;
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 16px 24px 16px 24px;
    border: solid;
    border-width: 3px;
    border-color: #76a8dd;
    border-radius: 1.2ch;
}

.search-info {
    display: flex;
    flex-direction: column;
    width: 87%;
    margin-right: 5%;
}

.search-options {
    display:flex;
}

.search-keyword {
    height: 60px;
    font-size: 19px;
}

.search-keyword .el-input__wrapper {
    height: 38px !important;
    padding: auto 5px auto auto !important;
}

.search-keyword .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}

.search-tags {
    width: 40% !important;
}

.search-select {
    width: 14%;
    margin-left: 1%;
}

.issues-table {
    width: 80%;
    padding-top: 10px;
    padding-bottom: 10px;
    border: solid;
    border-color: #76a8dd;
    border-radius: 1.2ch;
    border-width: 3px;
    margin-left: 10%;
    margin-top: 30px;
}
</style>
