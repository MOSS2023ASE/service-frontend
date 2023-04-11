<template> 
<v-container>
  <v-row class="mb-n10">
    <v-spacer></v-spacer>
    <v-col :cols="2">
      <v-text-field rounded outlined dense label="学号" v-model="user.id"></v-text-field>
    </v-col>
    <v-col :cols="2">
      <v-text-field rounded outlined dense label="姓名" v-model="user.name"></v-text-field>
    </v-col>
    <v-col :cols="2">
      <v-select rounded outlined dense label="用户类型" :items="userType" v-model="user.type"></v-select>
    </v-col>
    <v-col :cols="3"></v-col>
    <v-col :cols="1">
      <v-btn color="success">搜索</v-btn>
    </v-col>
    <v-col :cols="1">
      <v-btn color="orange" class="white--text">重置</v-btn>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
  <v-row>
    <v-spacer></v-spacer>
    <v-col :cols="11">
      <el-table
        :data="tableData"
        style="width: 100%;"
        :default-sort = "{prop: 'buaa_id', order: 'descending'}"
        >
        <el-table-column
          prop="buaa_id"
          label="学号"
          sortable
          align="center"
          width="140">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          width="140">
        </el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱"
          align="center"
          width="300">
        </el-table-column>
        <el-table-column
          prop="type"
          label="用户类型"
          align="center"
          width="140">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="300">
          <v-btn text color="blue">
            <v-icon>mdi-pencil</v-icon>
            <span class="ml-2">编辑信息</span>
          </v-btn>
          <v-btn text color="error">
            <v-icon>mdi-close-circle-outline</v-icon>
            <span class="ml-2">注销账号</span>
          </v-btn>
        </el-table-column>
      </el-table>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</v-container>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            buaa_id: '10000000',
            name: '学生1',
            email: '10000000@buaa.edu.cn',
            type: '学生'
          },
          {
            buaa_id: '10000008',
            name: '学生2',
            email: '10000008@buaa.edu.cn',
            type: '学生'
          },
          {
            buaa_id: '20000003',
            name: '管理员1',
            email: '20000003@buaa.edu.cn',
            type: '管理员'
          },
          {
            buaa_id: '20000027',
            name: '辅导师1',
            email: '20000027@buaa.edu.cn',
            type: '辅导师'
          } 
        ],
        user: {},
        userType:["学生","辅导师","管理员"] 
      }
    }
  }
</script>