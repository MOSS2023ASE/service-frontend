<template>
  <v-container>
    <v-card>
      <v-card-title class="ml-4">
        标签管理
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col v-for="(label, i) in label_list" :key="i" :cols="2">
            <v-chip outlined color="blue" close @click:close="deleteTag(label)">{{ label.content }}</v-chip>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="d-flex justify-center">
        <v-btn color="blue" class="white--text" @click="show = true" width="100px">添加标签</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="show" max-width="500px">
      <v-card>
        <v-card-title>新建标签</v-card-title>
        <v-card-text>
          <v-text-field dense outlined label="标签名" v-model="content"></v-text-field>
          <div class="d-flex justify-center">
            <v-btn color="success" @click="createTag">创建</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {create_tag, delete_tag, get_all_tags} from '@/api/tag'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      label_list:[],
      content: '',
      show: false
    }
  },
  mounted() {
    this.getTags();
  },
  methods: {
    getTags() {
      get_all_tags(getToken()).then(response => {
        this.label_list = response.data.tag_list;
      }).catch(error => {
        Message({
            message: '获取标签失败', 
            type: 'error'
        });
      });
    },
    deleteTag(label) {
      delete_tag(getToken(), label.tag_id).then(response => {
        this.getTags();
      }).catch(error => {
        Message({
          message: '删除标签失败',
          type: 'error'
        });
      });
    },
    createTag() {
      create_tag(getToken(), this.content).then(response => {
        Message({message: '创建成功', type: 'success'});
        this.getTags();
        this.show = false;
        this.content = '';
      }).catch(error => {
        Message({
          message: '添加标签失败',
          type: 'error'
        });
      });
    }
  }
}
</script>