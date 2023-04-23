<template>
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
            <v-btn @click="goStep(1, year)">{{ year.content }}</v-btn>
            <v-icon class="ml-2" v-if="canRemove" color="red">mdi-close-circle-outline</v-icon>
          </v-col>
        </v-row>
        <v-row v-if="step === 1">
          <v-col :cols="2" v-for="(subject, i) in subjects" :key="i">
            <v-btn @click="goStep(2, subject)">{{ subject.name }}</v-btn>
            <v-icon class="ml-2" v-if="canRemove" color="red">mdi-close-circle-outline</v-icon>
          </v-col>
        </v-row>
        <v-row v-if="step === 2">
          <v-col :cols="2" v-for="(chapter, i) in chapters" :key="i">
            <v-btn>{{ chapter.name }}</v-btn>
            <v-icon class="ml-2" v-if="canRemove" color="red"
            @click="removeChapter(chapter.chapter_id)">mdi-close-circle-outline</v-icon>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-spacer></v-spacer>
          <v-col :cols="2">
            <v-btn color="blue" class="white--text" v-if="step" @click="showDialog = true">
            添加{{ (step === 1) ? "科目" : "章节" }}
            </v-btn>
          </v-col>
          <v-col :cols="2">
            <v-btn color="red" class="white--text" @click="canRemove = !canRemove" v-if="step === 2">
            删除{{ (step === 1) ? "科目" : "章节" }}
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-dialog v-model="showDialog" max-width="300px">
          <v-card>
            <v-card-title>添加{{ (step === 1) ? "科目" : "章节" }}</v-card-title>
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
</template>

<script>
import { create_chapter, create_subject, delete_chapter, get_all_subjects, get_subject_all_chapters } from '@/api/subject';
import { getToken } from '@/utils/auth';
export default {
  data() {
    return {
      years: [],
      subjects: [],
      chapters: [],
      step: 0,
      canRemove: false,
      record: {},
      showDialog: false,
      newContent: "",
    }
  },
  mounted() {
    this.getYear();
  },
  methods: {
    getYear() {
      this.years = [{year_id: 1,
                    content: '大一上学期'},
                   {year_id: 2,
                    content: '大一下学期'}]; 
    },
    getSubject(year_id) {
      get_all_subjects(getToken(),
                      year_id).then(response => {
                        this.subjects = response.data.subject_list;
                        console.log('获取学科成功');
                      }).catch(error => {
                        console.log('获取学科失败');
                        console.log(error);
                      });
    },
    getChapter(subject_id) {
      get_subject_all_chapters(getToken(),
                              subject_id).then(response => {
                                this.chapters = response.data.chapter_list;
                                console.log('获取章节成功');
                                console.log(response.data.chapter_list);
                              }).catch(error => {
                                console.log('获取章节失败');
                                console.log(error);
                              });
    },
    goStep(step, target) {
      this.canRemove = false;
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
    submitContent() {
      if (this.step === 1) {
        create_subject(getToken(),
                      this.newContent,
                      "",
                      this.record.year.year_id).then(response => {
                        console.log('创建成功');
                        this.getSubject(this.record.year.year_id);
                        this.newContent = ""; 
                      }).catch(error => {
                        console.log(error);
                        console.log('创建失败');
                      });
      } else if (this.step === 2) {
        create_chapter(getToken(),
                      this.newContent,
                      "",
                      this.record.subject.subject_id).then(response => {
                        console.log('创建成功');
                        this.getChapter(this.record.subject.subject_id);
                        this.showDialog = false; 
                      }).catch(error => {
                        console.log(error);
                        console.log('创建失败');
                      });
      }
    },
    removeChapter(chapter_id) {
      console.log(chapter_id);
      delete_chapter(getToken(),
                    chapter_id).then(response => {
                      console.log('删除成功');
                      this.getChapter(this.record.subject.subject_id);
                    }).catch(error => {
                      console.log('删除失败');
                      console.log(error);
                    });
    }
  }
}
</script>