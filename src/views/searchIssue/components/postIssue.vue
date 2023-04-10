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
            <el-form-item label="所属科目">
                <el-select v-model="issue.subject" placeholder="选择所属科目">
                    <el-option label="数学分析" value="0" />
                    <el-option label="大学物理" value="1" />
                    <el-option label="数据结构" value="2" />
                    <el-option label="离散数学" value="3" />
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="所属章节">
                <el-select v-model="issue.chapter" placeholder="选择所属章节">
                    <el-option label="未分类" value="0" />
                </el-select>
            </el-form-item>
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
            visible: this.dialogVisible,
            editor: null,
            issue: {
                id: '',
                title: '',
                text: '',
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
            try {
                // TODO: call backend to post issue
                this.$emit('closeDialogEvent');
                console.log('close!!!!');
                Message({
                    message: '发布问题成功',
                    type: 'success'
                });
            } catch (err) {
                Message({
                    message: '发布问题失败',
                    type: 'error',
                })
                console.log(err);
            }
        },
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