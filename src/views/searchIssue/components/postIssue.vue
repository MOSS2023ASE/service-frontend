<template>
    <el-dialog title="发布问题"
                fullscreen
                :visible.sync="dialogVisible"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
        <el-form :model="issue">
            <el-form-item label="标题">
                <el-input v-model="issue.title" placeholder="点此输入标题..."/>
            </el-form-item>
            <el-form-item label="问题描述">
                <el-col :span="24">
                    <markdown-editor
                        v-model="content"
                        height="350px"
                        lang="zh"
                    />
                </el-col>
            </el-form-item>
            <el-row style="margin-top: 30px;">
            <el-col :span="8">
              <el-select v-model="issue.subject" class="search-select"
                         placeholder="科目">
                <el-option v-for="subject in all_subjects"
                           :key="subject.subject_id" :label="subject.name" :value="subject.subject_id"/>
              </el-select>
            </el-col>
            <el-col :span="8">
            <el-select v-show="this.issue.subject !== 0 && this.issue.subject !== null"
                       v-model="issue.chapter"
                       class="search-select" placeholder="选择所属章节">
              <el-option v-for="chapter in all_chapters[this.issue.subject]"
                         :key="chapter.chapter_id" :label="chapter.name" :value="chapter.chapter_id"/>
            </el-select>
<!--            <el-form-item label="所属章节">-->
<!--                <el-select v-model="issue.chapter" placeholder="选择所属章节">-->
<!--                    <el-option label="未分类" value="0" />-->
<!--                </el-select>-->
<!--            </el-form-item>-->
            </el-col>
            <el-col :span="8">
            <el-form-item label="是否匿名">
                <el-select v-model="issue.anonymous" placeholder="选择是否匿名">
                    <el-option label="否" value="0" />
                    <el-option label="是" value="1" />
                </el-select>
            </el-form-item>
            </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button id="confirm-button" type="primary" @click="postIssue">确认</el-button>
            <el-button id="cancel-button" @click="closeDialog">取消</el-button>
        </span>
    </el-dialog>
</template>

<script lang="js">
import { Message } from "element-ui";
import MarkdownEditor from '@/components/MarkdownEditor'
import {commit_issue} from '@/api/issue'
import {get_all_subjects, get_subject_all_chapters} from '@/api/subject'
import {getToken} from '@/utils/auth'
import { Editor } from 'tiptap'

export default {
    name: 'PostIssueDialog',
    components: {
        MarkdownEditor
    },
    props: {
        dialogVisible: Boolean
    },
    data() {
        return {
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
            visible: this.dialogVisible,
            editor: null,
            issue: {
                title: '',
                subject: null,
                chapter: null,
                anonymous: null,
            },
            content: '点此输入问题...',
        };
    },
    setup() {
        return {
        }
    },
    mounted() {
    },
    watch: {
        visible(val) {
            this.dialogVisible = val;
        }
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialogEvent');
        },
        loadImage(command){
            command({src: "https://66.media.tumblr.com/dcd3d24b79d78a3ee0f9192246e727f1/tumblr_o00xgqMhPM1qak053o1_400.gif"})
        },
        /* async */ postIssue() {
            // console.log(this.issue)
            // console.log(this.content)
            // console.log(parseInt(this.issue.anonymous))
            commit_issue(getToken(), this.issue.chapter, this.issue.title,
                this.content, parseInt(this.issue.anonymous)).then(response => {
                    this.$emit('closeDialogEvent');
                    console.log('close!!!!');
                    Message({
                      message: '发布问题成功',
                      type: 'success'
                    });
                }).catch(error => {
                    Message({
                      message: '发布问题失败',
                      type: 'error',
                    })
                    console.log(error);
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
    },
    created() {
        this.initChapters();
    },
}
</script>

<style scoped>
::v-deep .el-dialog__header {
    background-color: #689add !important;
}

::v-deep .el-dialog__footer {
    margin-top: auto !important;
    margin-bottom: 30px !important;
}

#confirm-button {
    color: white;
}

#cancel-button {
    color: black;
}

</style>
