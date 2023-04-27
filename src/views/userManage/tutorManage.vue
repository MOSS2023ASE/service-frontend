<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col :cols="8">
        <v-card>
          <v-card-title class="justify-center">
            <span class="ml-3">辅导师学科管理</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-left text-body-1" style="height: 150px;">
            <div class="ml-2 mt-2">您需要上传一个满足要求的 XLSX/XLS 表格文件：</div>
            <div class="ml-8 mt-2">
              表格存在共计两列，表头依次是：["辅导师学号", "辅导科目"]。
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="d-flex justify-center">
            <div style="width: 500px;">
              <v-file-input label="文件上传" v-model="uploadFile"></v-file-input>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-row class="mt-2">
            <v-spacer></v-spacer>
            <v-col class="d-flex justify-center">
              <v-btn color="error" class="white--text" @click="uploadCancel">取消导入</v-btn>
            </v-col>
            <v-col class="d-flex justify-center">
              <v-btn color="orange" class="white--text" @click="parseData">批量导入</v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { modify_user_subject } from '@/api/user'
import { getToken } from '@/utils/auth'
import { readTutorXlsx } from '@/utils/file'
import { get_all_subjects } from '@/api/subject'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      uploadFile: null,
      canUpload: true,
      subjects: []
    }
  },
  methods: {
    async uploadTable() {
      let err = false;
      let complete = false;
      for (let student_id of this.uploadData.keys()) {
        let subject_list = this.uploadData.get(student_id);
        let subject_id_list = [];
        for (let i = 0; i < subject_list.length; i++) {
          for (let j = 0; j < this.subjects.length; j++) {
            if (this.subjects[j].name === subject_list[i]) {
              subject_id_list.push(this.subjects[j].subject_id);
              break;
            }
          }
        }
        
        await modify_user_subject(getToken(), student_id, subject_id_list).then(response => {}).catch(error => {
          err = true;
        });
      }
      if (!err) {
        Message({
          message: '辅导师科目修改成功',
          type: 'success'
        }); 
      } else {
        Message({
          message: '辅导师科目修改失败',
          type: 'error'
        }); 
      }
    },
    uploadCancel() {
      this.uploadFile = null;
      this.uploadData = new Map(); 
    },
    getSubject(year_id = 1) {
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
    async parseData() {
      if (this.uploadFile !== null) {
        this.uploadData = await readTutorXlsx(this.uploadFile);
        this.uploadFile = null;
        this.uploadTable();
      } else {
        Message({
          message: '未上传文件或文件上传失败',
          type: 'error'
        }); 
      }
    }
  },
  mounted() {
    this.getSubject();
  }
}
</script>