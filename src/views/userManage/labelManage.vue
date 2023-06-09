<template>
  <v-app>
    <v-container>
    <v-card>
      <v-card-title class="ml-4">
        章节科目管理：
        <v-btn text class="text-h6" @click="goStep(0)">学年</v-btn>
        <span v-if="step > 0">/</span>
        <v-btn text class="text-h6" v-if="step > 0" @click="goStep(1, record.year)">科目</v-btn>
        <span v-if="step > 1">/</span>
        <v-btn text class="text-h6" v-if="step > 1">章节</v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row v-if="step === 0">
          <v-col :cols="2" v-for="(year, i) in years" :key="i">
            <v-chip outlined color="blue" @click="goStep(1, year)">{{ year.content }}</v-chip>
          </v-col>
        </v-row>
        <v-row v-if="step === 1">
          <v-col :cols="2" v-for="(subject, i) in subjects" :key="i">
            <v-chip outlined color="blue" @click="goStep(2, subject)">{{ subject.name }}</v-chip>
          </v-col>
        </v-row>
        <v-row v-if="step === 2">
          <v-col :cols="2" v-for="(chapter, i) in chapters" :key="i">
            <v-chip outlined color="blue" close @click:close="removeChapter(chapter.chapter_id)">{{ chapter.name }}</v-chip>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn color="blue" class="white--text" v-if="step >= 0" @click="showDialog = true" width="100px">
              添加{{ (step === 0) ? "学年" : (step === 1) ? "科目" : "章节" }}
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog v-model="showDialog" max-width="300px">
          <v-card>
            <v-card-title>添加{{ (step === 0) ? "学年" : (step === 1) ? "科目" : "章节" }}</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="newContent"
                label="新建内容"
                outlined
                dense
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-row class="mb-4">
                <v-spacer></v-spacer>
                <v-col class="d-flex justify-center">
                  <v-btn color="blue" class="white--text" @click="submitContent">提交</v-btn>
                </v-col>
                <v-col class="d-flex justify-center">
                  <v-btn color="error" @click="showDialog = false">放弃</v-btn>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-container>
  <label-view></label-view>
  </v-app>
</template>

<script>
import { create_chapter, create_subject, delete_chapter, get_all_subjects, get_subject_all_chapters } from '@/api/subject';
import {create_tag, delete_tag, update_tag, get_all_tags} from '@/api/tag'
import {get_all_years, create_year, update_year_info, update_current_year} from '@/api/year'
import { getToken } from '@/utils/auth';
import { Message } from 'element-ui';
import labelView from './labelView';
export default {
  data() {
    return {
      years: [],
      current_year_id: 1,
      current_year_content: '2023年',
      subjects: [],
      chapters: [],
      step: 0,
      record: {},
      showDialog: false,
      newContent: "",
    }
  },
  components: { labelView },
  mounted() {
    this.getYear();
  },
  methods: {
    getYear() {
      get_all_years(getToken()).then(response => {
        this.years = response.data['year_list'];
        this.current_year_id = response.data['current_year_id'];
        this.current_year_content = response.data['current_content'];
      }).catch(error => {
        Message({
          message: '获取学年失败',
          type: 'error'
        });
      });
    },
    getSubject(year_id) {
      get_all_subjects(getToken(),
        year_id).then(response => {
        this.subjects = response.data.subject_list;
      }).catch(error => {
        Message({
          message: '获取学科失败',
          type: 'error'
        });
      });
    },
    getChapter(subject_id) {
      get_subject_all_chapters(getToken(),
        subject_id).then(response => {
        this.chapters = response.data.chapter_list;
      }).catch(error => {
        Message({message: '获取章节失败', type: 'error'});
      });
    },
    goStep(step, target) {
      this.step = step;
      if (step === 0) {
        this.record = {};
        this.getYear();
      } else if (step === 1) {
        this.record.year = target;
        this.getSubject(target.year_id);
      } else if (step === 2) {
        this.record.subject = target;
        this.getChapter(target.subject_id);
      }
    },
    createTag() {
      create_tag(getToken(), this.newContent).then(response => {
        Message({
          message: '创建成功',
          type: 'success'
        });
      }).catch(error => {
        Message({
          message: '创建失败',
          type: 'error'
        });
      });
    },
    submitContent() {
      if (this.step === 0) {
        create_year(getToken(),
          this.newContent
        ).then(response => {
          Message({
            message: '创建成功',
            type: 'success'
          });
          this.getYear();
          this.newContent = "";
        }).catch(error => {
          Message({
            message: '创建失败',
            type: 'error'
          });
        });
      } else if (this.step === 1) {
        create_subject(getToken(),
          this.newContent,
          "",
          this.record.year.year_id).then(response => {
          Message({
            message: '创建成功',
            type: 'success'
          });
          this.getSubject(this.record.year.year_id);
          this.newContent = "";
        }).catch(error => {
          Message({
            message: '创建失败',
            type: 'error'
          });
        });
      } else if (this.step === 2) {
        create_chapter(getToken(),
          this.newContent,
          "",
          this.record.subject.subject_id).then(response => {
          Message({
            message: '创建成功',
            type: 'success'
          });
          this.getChapter(this.record.subject.subject_id);
          this.showDialog = false;
        }).catch(error => {
          Message({
            message: '创建失败',
            type: 'error'
          });
        });
      }
    },
    removeChapter(chapter_id) {
      delete_chapter(getToken(),
        chapter_id).then(response => {
        Message({
          message: '删除成功',
          type: 'success'
        });
        this.getChapter(this.record.subject.subject_id);
      }).catch(error => {
        Message({
          message: '删除失败',
          type: 'error'
        });
      });
    }
  }
}
</script>
