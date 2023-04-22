<template>
  <v-app>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col :cols="10">
          <v-card>
            <v-card-title>
              <v-icon>mdi-account-details-outline</v-icon>
              <span class="ml-3">个人信息</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row no-gutters>
                <v-col :cols="6" class="pl-16">
                  <v-avatar size="150">
                    <v-img :src="avatar">
                      <template v-slot:placeholder>
                        <v-img/>
                      </template>
                    </v-img>
                  </v-avatar>
                  <div class="mt-4">
                    <v-btn text color="blue" @click="$refs.input.click()">
                      <v-icon class="ml-n1 mr-1">mdi-pencil</v-icon>
                      <span class="text-h6">修改头像</span>
                    </v-btn>
                  </div>
                </v-col>
                <v-col>
                  <v-col v-for="item in items" :key="item.type" :cols="12" class="text-left">
                    <v-icon>{{ item.icon }}</v-icon>
                    <span class="ml-3">
                      {{ item.type }}
                      <span class="mx-3"></span>
                      {{ item.value }}
                    </span>
                  </v-col>
                  <v-col :cols="12" class="text-left mt-n2">
                    <v-icon color="error">mdi-lock-outline</v-icon>
                    <v-btn text class="ml-n1" color="error" @click="showDialog = true">修改密码</v-btn>
                  </v-col>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <input ref="input" type="file" name="image" accept="image/*" @change="loadAvatar" style="display: none" />

      <v-row>
        <v-col>
          <v-dialog v-model="showDialog" max-width="600px">
            <v-card>
              <v-card-title class="text-h5">修改密码</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="oldPwd"
                  label="输入旧的密码"
                  :append-icon="showOldPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showOldPwd ? 'text' : 'password'"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="newPwd"
                  label="输入新的密码"
                  :append-icon="showNewPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showNewPwd ? 'text' : 'password'"
                  outlined
                  dense
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-row class="mb-4">
                  <v-spacer></v-spacer>
                  <v-col class="d-flex justify-center">
                    <v-btn color="blue" class="white--text" @click="changePwd">提交</v-btn>
                  </v-col>
                  <v-col class="d-flex justify-center">
                    <v-btn color="error" @click="showDialog = false">放弃</v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-row class="mt-8" v-if="role === 0">
        <v-spacer></v-spacer>
        <v-col :cols="10">
          <v-card>
            <v-card-title>
              <v-icon>mdi-file-question-outline</v-icon>
              <span class="ml-3">提出的问题</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-n4">
              <user-issue :type="1"></user-issue>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

      <v-row class="mt-8" v-if="role === 1">
        <v-spacer></v-spacer>
        <v-col :cols="10">
          <v-card>
            <v-card-title>
              <v-icon>mdi-file-question-outline</v-icon>
              <span class="ml-3">回答的问题</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-n4">
              <user-issue :type="2"></user-issue>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

      <v-row class="mt-8" v-if="role === 1">
        <v-spacer></v-spacer>
        <v-col :cols="10">
          <v-card>
            <v-card-title>
              <v-icon>mdi-file-question-outline</v-icon>
              <span class="ml-3">复审的问题</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-n4">
              <user-issue :type="3"></user-issue>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

      <v-row class="mt-8">
        <v-spacer></v-spacer>
        <v-col :cols="10">
          <v-card>
            <v-card-title>
              <v-icon>mdi-file-question-outline</v-icon>
              <span class="ml-3">收藏的问题</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-n4">
              <user-issue :type="4"></user-issue>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import UserIssue from './userIssue'
import { get_user_info, password_modify, modify_user_info } from '@/api/user';
import { getToken, getRole } from '@/utils/auth';
import { Message } from 'element-ui';
import { upload_public } from '@/api/upload';
export default {
  data() {
    return {
      userInfo: {},
      items: [],
      userType: ['学生', '辅导师', '管理员'],
      showDialog: false,
      showOldPwd: false,
      showNewPwd: false, 
      oldPwd: '',
      newPwd: '',
      avatar: '',
      role: 0, 
    }
  },
  components: {
    UserIssue
  },
  mounted() {
    console.log(this.userInfo);
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      get_user_info(getToken()).then(response => {
        console.log(response);
        this.avatar = response.data.avatar;
        this.mail = response.data.mail;
        this.role = getRole();
        this.items = [
          {
            icon: 'mdi-fingerprint',
            type: '学号　　',
            value: response.data.student_id,
          },
          {
            icon: 'mdi-account-outline',
            type: '用户名　',
            value: response.data.name,
          },
          {
            icon: 'mdi-email-outline',
            type: '个人邮箱',
            value: response.data.mail,
          },
          {
            icon: 'mdi-card-account-details-outline',
            type: '用户类型',
            value: this.userType[getRole()],
          }
        ];
        console.log('获取个人信息成功');
      }).catch(error => {
        console.log('获取用户信息失败');
        console.log(error);
      });
    },
    changePwd() {
      password_modify(getToken(),
                      this.oldPwd,
                      this.newPwd).then(response => {
                        Message({
                          message: '修改密码成功',
                          type: 'success'
                        });
                        this.showDialog = false;
                      }).catch(error => {
                        Message({
                          message: '修改密码失败',
                          type: 'error'
                        });
                        this.showDialog = false;
                      });
    },
    async loadAvatar(element) {
      console.log(element.target.files[0]);
      let formData = new FormData();
      formData.append('file', element.target.files[0]);
      console.log(formData);
      upload_public(formData).then(response => {
        this.avatar = response.data.url;
        modify_user_info(getToken(),
                        this.avatar,
                        this.mail).then(response => {
                          this.getUserInfo();
                          Message({
                            message: '上传头像成功',
                            type: 'success'
                          });
                        }).catch(error => {
                          Message({
                            message: '上传头像失败',
                            type: 'error'
                          });
                        });
      }).catch(error => {
        Message({
          message: '上传头像失败',
          type: 'error'
        });
      });
    }
  }
}
</script>