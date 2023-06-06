<template>
  <v-container>
    <v-row class="mb-n10">
      <v-col :cols="2">
        <v-menu
          v-model="showDate1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date1"
              label="起始时间"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              dense
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date1"
            @input="showDate1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col :cols="2">
        <v-menu
          v-model="showDate2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date2"
              label="终止时间"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              dense
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date2"
            @input="showDate2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col> 

      <v-col :cols="2">
        <v-text-field rounded outlined dense label="志愿时长/有效问题" v-model="bonus_per_issue"></v-text-field>
      </v-col>
      
      <v-col :cols="2">
        <v-text-field rounded outlined dense label="志愿时长/回答问题" v-model="bonus_per_counsel"></v-text-field>
      </v-col>

      <v-col :cols="2">
        <v-text-field rounded outlined dense label="志愿时长/复审问题" v-model="bonus_per_review"></v-text-field>
      </v-col>

      <v-col :cols="1">
        <v-btn color="success" @click="search">查询</v-btn>
      </v-col>

      <v-col :cols="1">
        <v-btn color="orange" class="white--text" @click="exportCsv">导出</v-btn>
      </v-col>
    </v-row>
    
    <v-row class="mt-8">
      <v-col>
        <v-card>
          <el-table
            :data="data_list"
            style="width: 100%;"
            :default-sort = "{prop: 'student_id', order: 'descending'}"
            max-height="800px"
          >
            <el-table-column
              prop="student_id"
              label="学号"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="role"
              label="用户类型"
              align="center">
            </el-table-column>
            <el-table-column
              prop="bonus"
              label="志愿时长"
              align="center">
            </el-table-column>
          </el-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getToken } from '@/utils/auth';
import { get_tutor_bonus, get_student_bonus } from '@/api/statistics'
import { Message } from 'element-ui';
import { exportCsvFile } from '@/utils/file';
export default {
  data() {
    return {
      showDate1: false,
      showDate2: false,
      date1: '2023-05-01',
      date2: '2023-06-15',
      bonus_per_issue: '0.5',
      bonus_per_counsel: '1',
      bonus_per_review: '0.5',
      min_bonus: 0,
      max_bonus: 100,
      data_list: []
    }
  },
  methods: {
    getStudentBonus() {
      get_student_bonus(getToken(), parseFloat(this.bonus_per_issue), this.date1,
        this.date2, this.min_bonus, this.max_bonus).then(response => {
        for (let i = 0; i < response.data.bonus_list.length; i++) {
            let elm = {
                name: response.data.bonus_list[i].name,
                student_id: response.data.bonus_list[i].student_id,
                role: '学生',
                bonus: response.data.bonus_list[i].bonus
            }
            this.data_list.push(elm);
        }
      }).catch(error => {
        Message({
          message: '获取失败',
          type: 'error'
        });
      });
    },
    getTutorBonus() {
      get_tutor_bonus(getToken(), parseFloat(this.bonus_per_counsel), parseFloat(this.bonus_per_review), this.date1,
        this.date2, this.min_bonus, this.max_bonus).then(response => {
        for (let i = 0; i < response.data.bonus_list.length; i++) {
            let elm = {
                name: response.data.bonus_list[i].name,
                student_id: response.data.bonus_list[i].student_id,
                role: '辅导师',
                bonus: response.data.bonus_list[i].bonus
            }
            this.data_list.push(elm);
        }
      }).catch(error => {
        Message({
          message: '获取失败',
          type: 'error'
        });
      });
    },
    search() {
      this.data_list = [];
      this.getStudentBonus();
      this.getTutorBonus();
    },
    exportCsv() {
      exportCsvFile(this.data_list, '志愿时长统计');
    }
  }
}
</script>