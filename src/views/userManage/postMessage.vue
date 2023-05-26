<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col :cols="8">
        <v-text-field label="通知标题" v-model="title" style="width: 300px;"></v-text-field>
        <v-textarea label="通知内容" v-model="content"></v-textarea>
        <v-text-field label="统计图类型（0：折线图，1：饼图）" v-model="type" style="width: 300px;"></v-text-field>
        <v-text-field label="统计指标（0：辅导师回答问题数，1：辅导师复审问题数，2：issue访问次数）" v-model="indicator" style="width: 300px;"></v-text-field>
        <v-text-field label="开始日期（yyyy-mm-dd）" v-model="begin_date" style="width: 300px;"></v-text-field>
        <v-text-field label="结束日期（yyyy-mm-dd）" v-model="end_date" style="width: 300px;"></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
            <v-btn color="blue" class="white--text" width="80px" @click="broadcast">发送</v-btn>
        </v-col>
      <v-col class="d-flex justify-center">
        <v-btn color="blue" class="white--text" width="80px" @click="getStatistics">调用统计图接口</v-btn>
      </v-col>
        <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { getToken } from '@/utils/auth';
import { admin_broadcast } from '@/api/notify';
import {get_statistics} from '@/api/statistics'
import { Message } from 'element-ui';
export default {
  data() {
    return {
      title: "",
      content: "",
      type: '',
      indicator: '',
      begin_date: '',
      end_date: '',
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
