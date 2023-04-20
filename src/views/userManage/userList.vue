<template> 
<v-container>
  <v-row class="mb-n10">
    <v-spacer></v-spacer>
    <v-col :cols="2">
      <v-text-field rounded outlined dense label="学号" v-model="user.student_id"></v-text-field>
    </v-col>
    <v-col :cols="2">
      <v-text-field rounded outlined dense label="姓名" v-model="user.name"></v-text-field>
    </v-col>
    <v-col :cols="2">
      <v-select rounded outlined dense label="用户类型" :items="userType" v-model="user.user_role"></v-select>
    </v-col>
    <v-col :cols="3"></v-col>
    <v-col :cols="1">
      <v-btn color="success" @click="fillUser">搜索</v-btn>
    </v-col>
    <v-col :cols="1">
      <v-btn color="orange" class="white--text" @click="resetUser">重置</v-btn>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
  <v-row>
    <v-spacer></v-spacer>
    <v-col :cols="11">
      <v-card>
        <el-table
          :data="user_list_fill"
          style="width: 100%;"
          :default-sort = "{prop: 'student_id', order: 'descending'}"
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
            prop="user_role"
            label="用户类型"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <v-btn v-if="scope.row.frozen === 0" color="error" 
              @click="freezeUser(scope.row.user_id, 1)">冻结账号</v-btn>
              <v-btn v-if="scope.row.frozen === 1" color="blue" class="white--text" 
              @click="freezeUser(scope.row.user_id, 0)">解冻账号</v-btn>
            </template>
          </el-table-column>
        </el-table>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</v-container>
</template>

<script>
import { freeze_user, get_users } from '@/api/admin';
import { getToken } from '@/utils/auth';
export default {
  data() {
    return {
      user_list_fill: [],
      user_list: [],
      user: {
        student_id: "",
        name: "",
        user_role: ""
      },
      userType:["学生","辅导师","管理员"] 
    }
  },
  mounted() {
    this.getUser();
    this.fillUser();
  },
  methods: {
    freezeUser(id, frozen) {
      freeze_user(getToken(), 
                  id,
                  frozen).then(response => {
                    console.log(response);
                    for (let i = 0; i < this.user_list.length; i++) {
                      if (this.user_list[i].user_id === id) {
                        this.user_list[i].frozen = frozen;
                      }
                    }
                  }).catch(error => {
                    console.log('冻结用户失败')
                    console.log(error)
                  });
    },
    getUser() {
      get_users(getToken()).then(response => {
        this.user_list = response.data.user_list;
        this.user_list_fill = [];
        for (let i = 0; i < this.user_list.length; i++) {
          this.user_list[i].user_role = this.userType[this.user_list[i].user_role];
          this.user_list_fill.push(this.user_list[i]);
        };
        console.log(response);
      }).catch(error => {
        console.log('获取用户失败');
      })
    },
    fillUser() {
      this.user_list_fill = [];
      for (let i = 0; i < this.user_list.length; i++) {
        let student_id = this.user.student_id;
        let name = this.user.name;
        let user_role = this.user.user_role;
        if (student_id !== "" && this.user_list[i].student_id !== student_id) continue;
        if (name !== "" && this.user_list[i].name !== name) continue;
        if (user_role !== "" && this.user_list[i].user_role !== user_role) continue;
        this.user_list_fill.push(this.user_list[i]);
      }
    },
    resetUser() {
      this.user = {
        student_id: "",
        name: "",
        user_role: ""
      };
      this.fillUser();
    }
  }
}
</script>