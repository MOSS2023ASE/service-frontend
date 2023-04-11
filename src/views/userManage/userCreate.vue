<template>
  <v-app>
    <v-container>
      <v-row class="mt-6" v-if="page === 1">
        <v-spacer></v-spacer>
        <v-col :cols="4">
          <v-card>
            <v-card-title class="justify-center">
              <span>逐个创建用户</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="align-center pl-16 pr-16" style="height: 300px">
              <v-form>
                <v-text-field rounded outlined dense label="学号" v-model="user.id"></v-text-field>
                <v-text-field rounded outlined dense label="用户名" v-model="user.name"></v-text-field>
                <v-text-field rounded outlined dense label="用户邮箱" v-model="user.email"></v-text-field>
                <v-select rounded outlined dense label="用户类型" :items="userType" v-model="user.type"></v-select>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-row class="mt-1">
              <v-spacer></v-spacer>
              <v-col class="d-flex justify-center">
                <v-btn color="blue" class="white--text">确认创建</v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
        <v-col :cols="7">
          <v-card>
            <v-card-title class="justify-center">
              <span class="ml-3">批量导入用户</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="text-left text-body-1" style="height: 200px;">
              <div class="ml-2 mt-2">您需要上传一个满足要求的 XLSX/XLS 表格文件：</div>
              <div class="ml-8 mt-2">
                表格存在共计四列，表头依次是：["学号", "用户名", "用户类型", "用户邮箱"]。
              </div>
              <div class="ml-2 mt-2">
                每当批量导入学生时:
              </div>
              <div class="ml-8 mt-2">
                若学生在系统中没有用户，自动创建相应用户。
              </div>
              <div class="ml-8 mt-2">
                若学生在系统中有用户，更新其姓名、邮箱、用户类型。
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="d-flex justify-center">
              <div style="width: 500px;">
                <v-file-input label="文件上传"></v-file-input>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-row class="mt-2">
              <v-spacer></v-spacer>
              <v-col class="d-flex justify-center">
                <v-btn color="error" class="white--text">取消导入</v-btn>
              </v-col>
              <v-col class="d-flex justify-center">
                <v-btn color="blue" class="white--text">开始解析</v-btn>
              </v-col>
              <v-col class="d-flex justify-center">
                <v-btn color="grey" class="white--text">批量导入</v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row v-if="page === 2">
        <v-col>
          <user-list></user-list>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-pagination
            v-model="page"
            :length="2">
          </v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import UserList from './userList'
export default {
  data() {
    return {
      userType:["学生","辅导师","管理员"],
      user:{},
      page: 1
    }
  },
  components: { UserList }
}
</script>