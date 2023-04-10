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
                            :key="tag" :label="tag" :value="tag"/>
                    </el-select>
                    <el-select v-model="sort_order"
                               class="search-select" placeholder="排序方式">
                        <el-option label="最近优先" value="0" />
                        <el-option label="最早优先" value="1" />
                        <el-option label="最热优先" value="2" />
                        <el-option label="综合排序" value="3" />
                    </el-select>
                    <el-select v-show="this.user_type !== 0" v-model="search_state"
                               class="search-select" placeholder="问题状态">
                        <el-option label="未认领回答" value="0" />
                        <el-option label="已认领回答" value="1" />
                        <el-option label="未认领复审" value="2" />
                        <el-option label="已认领复审" value="3" />
                        <el-option label="有效回答" value="4" />
                        <el-option label="无效回答" value="5" />
                    </el-select>
                    <el-select v-model="search_subject"
                               class="search-select" placeholder="科目">
                        <el-option label="未选择" value="0" />
                        <el-option label="数学分析" value="1" />
                        <el-option label="大学物理" value="2" />
                        <el-option label="数据结构" value="3" />
                        <el-option label="离散数学" value="4" />
                    </el-select>
                    <el-select v-show="this.search_subject !== 0 && this.search_subject !== null"
                               v-model="search_chapter"
                               class="search-select" placeholder="章节">
                        <el-option label="未分类" value="0" />
                        <!-- TODO：先获取该科目所有章节，然后渲染 -->
                    </el-select>
                </div>
            </div>
            <el-button icon="el-icon-search" style="width: 8%; height: inherit;" @click="search">搜索</el-button>
        </div>
        <div class="issues-table">
            <!--在这里应该最多传三个tag进去，不然显示不了 -->
            <IssueItem
            v-for="issue in issues"
            :user_type="user_type"
            :id="issue.issue_id"
            :title="issue.issue_title"
            :user_name="issue.user_name"
            :user_avatar="issue.user_avatar"
            :abstract="issue.abstract"
            :issue_time="issue.issue_time"
            :subject="issue.subject"
            :chapter="issue.chapter"
            :tags="issue.tags" 
            :issue_like_count="issue.issue_like_count"
            :issue_comment_count="issue.issue_comment_count"
            />
            <el-pagination small layout="prev, pager, next"
                :page-size="5" :total="issue_count"
                @prev-click="toPrevPage" @next-click="toNextPage">
            </el-pagination>
        </div>
</div>
</template>

<script>
import IssueItem from "./components/issueItem.vue";
import PostIssue from "./components/postIssue.vue";
import {Message} from 'element-ui'

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
            user_type: 0,
            search_keyword: '',
            search_tags: [],
            search_state: null,
            search_subject: null,
            search_chapter: null,
            sort_order: null,
            all_tags: [
                '作业题',
                '答案勘误',
                '踩坑分享',
                'debug',
            ],     
            all_issues: [
                {
                    id: 'issue0',
                    issue_title: '对数分答案的异议',
                    user_name: '学生A',
                    abstract: '怀疑书上这道积分题答案有误。如下是我的...',
                    issue_time: '2022-08-08',
                    subject: '数学分析',
                    chapter: '不定积分',
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
                    subject: '数据结构',
                    chapter: '树',
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
            issue_count: 7,
            cur_page: 1,
            total_page: 2,
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
            // TODO
            Message({
                message: '搜索',
                type: 'success',
            })
        },
        /* async */ initTags() {
            try {
                // TODO
            } catch (err) {
                Message({
                    message: '获取标签失败',
                    type: 'error',
                })
                console.log(err);
            }
        },
        /* async */ getIssues() {
            // TODO: get issues and issue_count
            this.issues = this.all_issues.slice(0, 5);
        },

        /* async */ toPrevPage() {
            // TODO
            if (this.cur_page !== 1) {
                this.issues = this.all_issues.slice((this.cur_page - 2) * 5, (this.cur_page - 1) * 5);
                this.cur_page -= 1;
            }
        },

        /* async */ toNextPage() {
            // TODO
            if (this.cur_page !== this.total_page) {
                this.issues = this.all_issues.slice(this.cur_page * 5, (this.cur_page + 1) * 5);
                this.cur_page += 1;
            }
        }
    },
    created() {
        // TODO: get user_type
        this.initTags();
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