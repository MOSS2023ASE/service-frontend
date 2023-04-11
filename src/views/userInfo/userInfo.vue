<template>
  <v-app>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col :cols="8">
          <v-card>
            <v-card-title>
              <v-icon>mdi-account-details-outline</v-icon>
              <span class="ml-3">个人信息</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row no-gutters>
                <v-col :cols="5" class="pl-16">
                  <v-avatar size="150">
                    <v-img :src="require('@/assets/images/anonymous.jpg')"></v-img>
                  </v-avatar>
                  <div class="mt-4">
                    <v-btn text color="blue">
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
                    <v-btn text class="ml-n1" color="error">修改密码</v-btn>
                  </v-col>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

      <v-row class="mt-8">
        <v-spacer></v-spacer>
        <v-col :cols="8">
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

      <v-row class="mt-8">
        <v-spacer></v-spacer>
        <v-col :cols="8">
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

      <v-row class="mt-8">
        <v-spacer></v-spacer>
        <v-col :cols="8">
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
    </v-container>
  </v-app>
</template>

<script>
import UserIssue from './userIssue'
export default {
  components: {
    UserIssue
  },
  computed: {
    items() {
      return [
        {
          icon: 'mdi-fingerprint',
          type: '学号　　',
          value: '12345678'
        },
        {
          icon: 'mdi-account-outline',
          type: '用户名　',
          value: '士小信'
        },
        {
          icon: 'mdi-email-outline',
          type: '个人邮箱',
          value: '12345678@buaa.edu.cn'
        },
        {
          icon: 'mdi-card-account-details-outline',
          type: '用户类型',
          value: '学生'
        }
      ]
    }
  }
}
</script>