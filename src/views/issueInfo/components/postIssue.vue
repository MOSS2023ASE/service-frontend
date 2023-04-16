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
              <el-option label="数学分析" value="0"/>
              <el-option label="大学物理" value="1"/>
              <el-option label="数据结构" value="2"/>
              <el-option label="离散数学" value="3"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属章节">
            <el-select v-model="issue.chapter" placeholder="选择所属章节">
              <el-option label="未分类" value="0"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否匿名">
            <el-select v-model="issue.anonymous" placeholder="选择是否匿名">
              <el-option label="否" value="0"/>
              <el-option label="是" value="1"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button id="confirm-button" type="primary"
                       @click="this.editmode ?upadteIssue():postIssue">确认</el-button>
            <el-button id="cancel-button" @click="closeDialog">取消</el-button>
        </span>
  </el-dialog>
</template>

<script lang="js">
import {Message} from "element-ui";
import MarkdownEditor from '@/components/MarkdownEditor'
import {
  get_issue_detail,
  update_issue_info
} from "@/api/issue";

export default {
  name: 'PostIssueDialog',
  components: {
    MarkdownEditor
  },
  props: {
    dialogVisible: Boolean,
    editmode: false,
    issue_id: 0
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
      content: '点此输入好问题...',
    };
  },
  setup() {
    return {}
  },
  mounted() {
    if (this.editmode) {
      this.getIssueInfo()
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    }
  },
  computed: {
    dialogtitle() {
      if (this.editmode) {
        return '编辑问题'
      }
      return '发布问题'
    }
  },
  methods: {
    getIssueInfo() {
      let jwt = this.$store.state.user.token
      this.issue.id = this.issue_id
      get_issue_detail(jwt, this.issue_id).then(response => {
        this.issue.title = response.data.title
        this.content = response.data.content
        this.issue.text = response.data.content
        this.issue.chapter = response.data.chapter_id
        this.issue.subject = response.data.subject_id
        this.issue.anonymous = response.data.anonymous
      }).catch(error => {
        this.$notify({
          title: '获取失败',
          message: '获取issue信息失败',
          type: 'warning',
          duration: 2000
        })
      })
    },
    closeDialog() {
      this.$emit('closeDialogEvent');
    },
    loadImage(command) {
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
    upadteIssue() {
      let jwt = this.$store.state.user.token
      update_issue_info(jwt,
        this.issue.id,
        this.issue.chapter,
        this.issue.title,
        this.content,
        this.issue.anonymous).catch(response => {
        this.$notify({
          title: '编辑成功',
          message: '编辑issue信息成功',
          type: 'info',
          duration: 2000
        })
      }).catch(err => {
        this.$notify({
          title: '编辑失败',
          message: '编辑issue信息失败',
          type: 'warning',
          duration: 2000
        })
      })
    }
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
