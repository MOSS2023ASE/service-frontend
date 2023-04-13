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
                <v-text-field rounded outlined dense label="用户密码" v-model="user.password"></v-text-field>
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
                表格存在共计四列，表头依次是：["学号", "用户名", "用户密码", "用户类型"]。
              </div>
              <div class="ml-2 mt-2">
                每当批量导入学生时:
              </div>
              <div class="ml-8 mt-2">
                若学生在系统中没有用户，自动创建相应用户。
              </div>
              <div class="ml-8 mt-2">
                若学生在系统中有用户，更新其用户名、用户密码、用户类型。
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
                <v-btn color="blue" class="white--text" @click="uploadParse">
                  {{ canUpload ? '开始解析' : '解析中...' }}
                </v-btn>
              </v-col>
              <v-col class="d-flex justify-center">
                <v-btn color="orange" class="white--text">批量导入</v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <el-table
              :data="dataTable"
              style="width: 100%;"
              v-if="dataTable.length !== 0"
              >
              <el-table-column
                prop="student_id"
                label="学号"
                sortable
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                label="用户名"
                align="center">
              </el-table-column>
              <el-table-column
                prop="password"
                label="用户密码"
                align="center">
              </el-table-column>
              <el-table-column
                prop="role"
                label="用户类型"
                align="center">
              </el-table-column>
            </el-table>
          </v-card>
        </v-col>
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
import UserList from './userList';
import { readXlsxFile } from '@/utils/file';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      userType:["学生","辅导师","管理员"],
      user:{},
      page: 1,
      uploadFile: null,
      canUpload: true,
      parseTable: {},
      dataTable: []
    }
  },
  components: { UserList },
  methods: {
    uploadCancel() {
      this.canUpload = true;
      this.uploadFile = null;
      this.parseTable = {};
      this.dataTable = [];
    },
    async uploadParse() {
      if (this.uploadFile !== null) {
        if (['application/vnd.ms-excel', 'application/wps-office.xls'].indexOf(this.uploadFile.type) !== -1) {
          this.canUpload = false;
          console.log('test1');
          this.parseTable = await readXlsxFile(this.uploadFile);
          console.log(this.parseTable);
          this.dataTable = await this.getDataTable(this.parseTable);
          this.canUpload = true; 
          this.uploadFile = null;
        } else {
          Message({
            message: '不支持该类型的文件',
            type: 'error'
          });
        }
      } else {
        Message({
          message: '未上传文件或文件上传失败',
          type: 'error'
        })
      }
    },
    getDataTable(table) {
      let data = [];
      for (let i = 0; i < table.student_id_list.length; i++) {
        let elm = {
          student_id: table.student_id_list[i],
          name: table.name_list[i],
          password: table.password_list[i],
          role: table.role_list[i]
        };
        data.push(elm);
      }
      return data;
    }
  }
}
</script>