<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="提出时间"
      sortable
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="问题名称"
      align="center"
      width="240">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      align="center">
      <v-btn text color="blue" v-if="type == 1">
        <v-icon>mdi-timeline-check-outline</v-icon>
        <span class="ml-2">关闭</span>
      </v-btn>
      <v-btn text color="blue" v-if="type == 2">
        <v-icon>mdi-file-document-outline</v-icon>
        <span class="ml-2">查看</span>
      </v-btn>
      <v-btn text color="success" v-if="type == 3">
        <v-icon>mdi-check-circle</v-icon>
        <span class="ml-2">通过</span>
      </v-btn>
      <v-btn text color="error" v-if="type == 3">
        <v-icon>mdi-close-circle</v-icon>
        <span class="ml-2">驳回</span>
      </v-btn>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2023-04-04',
          name: '数学分析第一章课后题',
        }, {
          date: '2023-04-05',
          name: '高等代数课后题第三题疑问',
        }, {
          date: '2023-04-10',
          name: '程设链表第三题求debug',
        }]
      }
    },
    props: ['type']
  }
</script>