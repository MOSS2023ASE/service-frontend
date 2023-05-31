<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col :cols="8">
        <v-text-field label="通知标题" v-model="title" style="width: 300px;"></v-text-field>
        <v-textarea label="通知内容" v-model="content"></v-textarea>
<!--        <v-text-field label="统计图类型（0：折线图，1：饼图）" v-model="type" style="width: 300px;"></v-text-field>-->
<!--        <v-text-field label="统计指标（0：辅导师回答问题数，1：辅导师复审问题数，2：issue访问次数）" v-model="indicator" style="width: 300px;"></v-text-field>-->
        <v-text-field label="开始日期（yyyy-mm-dd）" v-model="begin_date" style="width: 300px;"></v-text-field>
        <v-text-field label="结束日期（yyyy-mm-dd）" v-model="end_date" style="width: 300px;"></v-text-field>
        <v-text-field label="bonus_per_issue" v-model="bonus_per_issue" style="width: 300px;"></v-text-field>
        <v-text-field label="bonus_per_counsel" v-model="bonus_per_counsel" style="width: 300px;"></v-text-field>
        <v-text-field label="bonus_per_review" v-model="bonus_per_review" style="width: 300px;"></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
            <v-btn color="blue" class="white--text" width="80px" @click="broadcast">发送</v-btn>
        </v-col>
      <v-col class="d-flex justify-center">
        <v-btn color="blue" class="white--text" width="80px" @click="getStudentBonus">学生志愿</v-btn>
      </v-col>
      <v-col class="d-flex justify-center">
        <v-btn color="blue" class="white--text" width="80px" @click="getTutorBonus">辅导师志愿</v-btn>
      </v-col>
<!--      <v-col class="d-flex justify-center">-->
<!--        <v-btn color="blue" class="white&#45;&#45;text" width="80px" @click="getStatistics">调用统计图接口</v-btn>-->
<!--      </v-col>-->
        <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { getToken } from '@/utils/auth';
import { admin_broadcast } from '@/api/notify';
import {get_statistics, get_tutor_bonus, get_student_bonus} from '@/api/statistics'
import { Message } from 'element-ui';
export default {
  data() {
    return {
      title: "",
      content: "",
      type: '',
      indicator: '',
      begin_date: '2023-05-01',
      end_date: '2023-05-31',
      bonus_per_issue: 0.5,
      bonus_per_counsel: 1.0,
      bonus_per_review: 0.5,
      max_bonus: 100,
      min_bonus: 0,
    }
  },
  methods: {
    getStatistics() {
      console.log(this.type)
      console.log(this.indicator)
      get_statistics(getToken(), parseInt(this.type), parseInt(this.indicator), this.begin_date, this.end_date).then(response => {
        console.log(response)
        Message({
          message: '统计图获取成功',
          type: 'success'
        });
      }).catch(error => {
        console.log(error)
        Message({
          message: '统计图获取失败',
          type: 'error'
        });
      });
    },
    getStudentBonus() {
      get_student_bonus(getToken(), parseFloat(this.bonus_per_issue), this.begin_date,
        this.end_date, this.min_bonus, this.max_bonus).then(response => {
        console.log(response)
        Message({
          message: '获取成功',
          type: 'success'
        });
      }).catch(error => {
        console.log(error)
        Message({
          message: '获取失败',
          type: 'error'
        });
      });
    },
    getTutorBonus() {
      get_tutor_bonus(getToken(), parseFloat(this.bonus_per_counsel), parseFloat(this.bonus_per_review), this.begin_date,
        this.end_date, this.min_bonus, this.max_bonus).then(response => {
        console.log(response)
        Message({
          message: '获取成功',
          type: 'success'
        });
      }).catch(error => {
        console.log(error)
        Message({
          message: '获取失败',
          type: 'error'
        });
      });
    },
    broadcast() {
      admin_broadcast(getToken(),
                      this.title,
                      this.content,
                      0).then(response => {
                        Message({
                          message: '消息已发布',
                          type: 'success'
                        });
                        this.title = '';
                        this.content = '';
                      }).catch(error => {
                        Message({
                          message: '消息发布失败',
                          type: 'error'
                        });
                      });
    }
  }
}
</script>
