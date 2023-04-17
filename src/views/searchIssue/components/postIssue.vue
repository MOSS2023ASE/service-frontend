<template>
  <el-dialog :title="this.dialogtitle"
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
              <el-option label="否" value="0"/>
              <el-option label="是" value="1"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button id="confirm-button" type="primary" @click="editMode?upadteIssue():postIssue()">确认</el-button>
            <el-button id="cancel-button" @click="closeDialog">取消</el-button>
        </span>
  </el-dialog>
</template>

<script lang="js">
import {Message} from "element-ui";
import MarkdownEditor from '@/components/MarkdownEditor'
import {
  commit_issue, get_issue_detail,
  update_issue_info
} from '@/api/issue'
import {get_all_subjects, get_subject_all_chapters} from '@/api/subject'
import {getToken} from '@/utils/auth'

export default {
  name: 'PostIssueDialog',
  components: {
    MarkdownEditor
  },
  props: {
    dialogVisible: Boolean,
    editMode: {
      Type: Boolean,
      default: false
    },
    issue_id: {
      Type: Number,
      default: 0
    }
  },
  data() {
    return {
      year_id: 2,
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
    return {}
  },
  mounted() {
    if (this.editMode) {
      console.log('editmode')
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
      if (this.editMode) {
        return '编辑问题'
      }
      return '发布问题'
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialogEvent');
    },
    loadImage(command) {
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
      get_all_subjects(getToken(), this.year_id).then(response => {
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
            console.log('获取章节失败')
            console.log(error)
          })
        }
        console.log('获取科目章节成功')
      }).catch(error => {
        console.log('获取科目失败')
        console.log(error)
      })
    },
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
