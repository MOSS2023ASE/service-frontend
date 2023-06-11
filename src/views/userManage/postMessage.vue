<template>
  <v-app>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col :cols="8">
        <v-card>
          <v-card-text>
            <v-text-field dense rounded outlined label="通知标题" v-model="title" style="width: 300px;"></v-text-field>
            <v-textarea outlined label="通知内容" v-model="content"></v-textarea>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="blue" class="white--text mb-4" width="80px" @click="broadcast">发送</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
  </v-app>
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
    }
  },
  methods: {
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
