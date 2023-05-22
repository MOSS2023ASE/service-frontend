<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col :cols="8">
        <v-text-field label="通知标题" v-model="title" style="width: 300px;"></v-text-field>
        <v-textarea label="通知内容" v-model="content"></v-textarea>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
            <v-btn color="blue" class="white--text" width="80px" @click="broadcast">发送</v-btn>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { getToken } from '@/utils/auth';
import { admin_broadcast } from '@/api/notify';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      title: "",
      content: "",
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