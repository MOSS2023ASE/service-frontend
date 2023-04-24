<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.dish_name"
        placeholder="输入菜名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.dish_star" placeholder="选择评分" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in starOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.canteen_name" placeholder="选择食堂" clearable class="filter-item"
                 style="width: 130px">
        <el-option
          v-for="item in canteenOptions"
          :key="item.canteen_id"
          :label="item.canteen_name"
          :value="item.canteen_name"
        />
      </el-select>
      <el-select v-model="listQuery.sort_by_id" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter"
                 style="margin-left: 3mm">
        检索菜品
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加菜品
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="showNotify"
      >
        发布通知
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreateCanteen"
      >
        新增食堂
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="showCanteenList"
      >
        食堂列表
      </el-button>
      <!--
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        Export
      </el-button>
      -->
      <!--
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
      -->

    </div>
    <el-dialog :visible.sync="canteenListVisible" title="食堂列表" width="600px">
      <el-table
        style="width: 100%"
        :data="canteenOptions"
        align="center"
        fit
        highlight-current-row
      >
        <el-table-column
          prop="canteen_name"
          label="食堂名"
          width="100%"
          align="center"
        >
          <template v-slot="{row}">
            <span>{{ row.canteen_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="canteen_location"
          label="食堂地址"
          width="350px"
          align="center"
        >
          <template v-slot="{row}">
            <span>{{ row.canteen_location }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100%"
          align="center"
        >
          <template v-slot="{row,$index}">
            <el-button size="mini" type="danger" @click="handleDeleteCanteen(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div class="table-container">
      <el-table
        :key="tableKey"
        :v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <el-table-column
          label="ID"
          prop="dish_id"
          sortable="custom"
          align="center"
          width="90px"
          :class-name="getSortClass('dish_id')"
        >
          <template v-slot="{row}">
            <span>{{ row.dish_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="菜品名称" width="200px" align="center">
          <template v-slot="{row}">
            <span>{{ row.dish_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="食堂" width="200px" align="center">
          <template v-slot="{row}">
            <span>{{ row.canteen_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="170px" align="center">
          <template v-slot="{row}">
            <span>￥{{ row.dish_price }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
          <template v-slot="{row}">
            <span style="color:red;">{{ row.reviewer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评分" width="180px" align="center">
          <template v-slot="{row}">
            <el-rate
              v-model="row.dish_star"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="评论数" align="center" width="200px">
          <template v-slot="{row}">
            <span v-if="row.comment_count" class="link-type" @click="handleShowComment(row)"
            >{{ row.comment_count }}</span>
            <span v-else>0</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="385px" class-name="small-padding fixed-width">
          <template v-slot="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <!--            <el-button-->
            <!--              v-if="row.status!=='published'"-->
            <!--              size="mini"-->
            <!--              type="success"-->
            <!--              @click="handleModifyStatus(row,'published')"-->
            <!--            >-->
            <!--              Publish-->
            <!--            </el-button>-->
            <!--            <el-button v-if="row.status!=='draft'" size="mini" @click="handleModifyStatus(row,'draft')">-->
            <!--              Draft-->
            <!--            </el-button>-->
            <el-button v-if="row.status!=='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      v-show="list_length>0"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
      :total="list_length"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="600px">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="120px"
        style="width: 500px; margin-left:30px;"
      >
        <el-form-item label="菜品名称" prop="dish_name">
          <el-input v-model="temp.dish_name"/>
        </el-form-item>
        <el-form-item label="食堂" prop="canteen_name">
          <el-select v-model="temp.canteen_name" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in this.canteenOptions"
              :key="item.canteen_id"
              :label="item.canteen_name"
              :value="item.canteen_name"
            />
          </el-select>
        </el-form-item>
        <!--
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>
        </el-form-item>
        -->
        <el-form-item label="价格" prop="dish_price">
          <span style="font-size: large;padding-right: 5px">￥</span>
          <el-input placeholder="00.00" style="width: 150px" v-model="temp.dish_price"></el-input>
        </el-form-item>

        <el-form-item label="菜品标签" prop="dish_tag">
          <el-select v-model="temp.dish_tag" multiple placeholder="请选择">
            <el-option
              v-for="item in tasteOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜品详情" prop="dish_info">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="temp.dish_info">
          </el-input>
        </el-form-item>

        <el-form-item label="菜品图片" prop="dish_pic">

          <el-upload
            class="avatar-uploader"
            ref="upload"
            action="https://www.imgtp.com/api/upload"
            :headers="headerObj"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :with-credentials="false">
            <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="" style="max-width: 300px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogCanteenVisible" title="新增食堂" width="450px"
               @close="canteenDialogStatus='';dialogCanteenVisible=false">
      <el-form
        ref="CanteenForm"
        :model="canteen"
        label-position="left"
        label-width="120px"
        style="width: 300px; margin-left:50px"
      >
        <el-form-item label="食堂名" prop="canteen_name">
          <el-input v-model="canteen.canteen_name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="食堂地址" prop="canteen_location">
          <el-input v-model="canteen.canteen_location" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="canteenDialogStatus==='create'?createCanteenData():updateCanteenData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogCommentVisible" title="评论列表" width="900px" @close="dialogCommentVisible=false">
      <el-table
        style="width: 100%"
        :data="comments"
        align="center"
        fit
        highlight-current-row
      >
        <el-table-column
          prop="comment_id"
          label="评论ID"
          width="100%"
          align="center"
        >
          <template v-slot="{row}">
            <span>{{ row.comment_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="评论用户"
          width="100%"
          align="center"
        >
          <template v-slot="{row}">
            <span>{{ row.headline }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="comment_content"
          label="评论内容"
          width="300px"
          align="center"
        >
          <template v-slot="{row}">
            <span v-html="row.subtitle"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="comment_star"
          label="评分"
          width="200px"
          align="center"
        >
          <template v-slot="{row}">
            <el-rate
              v-model="row.comment_star"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100%"
          align="center"
        >
          <template v-slot="{row,$index}">
            <el-button size="mini" type="danger" @click="handleDeleteComment(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <v-dialog v-model="NotifyDialog" width="600px">
      <v-card>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col>
                <text-box
                  @close="NotifyDialog = false"
                ></text-box>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>

    </v-dialog>


  </div>
</template>

<script>
import {fetchList, fetchDish, createDish, updateDish, deleteDish} from '@/api/dish'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination'
import item from '@/layout/components/Sidebar/Item' // secondary package based on el-pagination
import TextBox from "@/components/Notify/TextBox";
import {createCanteen, deleteCanteen, getCanteenList} from "@/api/canteen";
import axios from "axios";
import {updateInfo} from "@/api/user";
import CommentDialog from "@/views/management/components/commentDialog";
import {deleteComment, getComments} from "@/api/comment";
// let canteenOptions = [
//   {key: '合一', display_name: '合一'},
//   {key: '学二', display_name: '学二'},
//   {key: '新北', display_name: '新北'}
// ]

const tasteOptions = [
  {key: '酸甜', display_name: '酸甜'},
  {key: '辣味', display_name: '辣味'},
  {key: '清淡', display_name: '清淡'},
  {key: '苦香', display_name: '苦香'}
]

// arr to obj, such as { CN : "China", US : "USA" }

// const canteenTypeKeyValue = canteenOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

const MoneyTest = /((^[1-9]\d*)|^0)(\.\d{0,2})?$/
const validateMoney = (rule, value, callback) => {
  rule = MoneyTest
  if (rule.test(value)) {
    callback()
  } else {
    callback('price must be a number with two decimal places')
  }
}
const pageList = (list, page, limit) => {
  // console.log(list.filter((item, index) => index < limit * page && index >= limit * (page - 1)))
  return list.filter((item, index) => index < limit * page && index >= limit * (page - 1))
}
export default {
  name: 'ComplexTable',
  components: {CommentDialog, Pagination, TextBox},
  directives: {waves},
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    // canteenFilter(canteen_name) {
    //   return canteenTypeKeyValue[canteen_name]
    // },

  },
  data() {
    let canteenOptions;
    return {
      avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      AvatarDialog: false,
      headerObj: {
        Authorization: 'a7e9d40943d7d6876ed698cdd25dfb73'
      },
      imgUrl: '',
      tableKey: 0,
      list: null,
      dish_list: [],
      list_length: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        dish_star: undefined,
        dish_name: undefined,
        canteen_name: undefined,
        sort_by_id: '+id'
      },
      starOptions: [1, 2, 3, 4, 5],
      canteenOptions: [],
      tasteOptions,
      sortOptions: [{label: 'ID增序', key: '+id'}, {label: 'ID降序', key: '-id'}],
      showReviewer: false,
      temp: {
        dish_id: undefined,
        dish_name: '',
        dish_price: Number(0.00),
        dish_star: 1,
        canteen_name: '',
        dish_tag: [],
        dish_info: '',
        dish_pic: '',
        timestamp: new Date(),
        comment_count: 0
      },
      canteen: {
        canteen_id: 0,
        canteen_name: '',
        canteen_location: ''
      },
      canteenList: [],
      canteenDialogStatus: '',
      canteenListVisible: false,
      dialogFormVisible: false,
      dialogCanteenVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      dialogCommentVisible: false,
      rules: {
        canteen_name: [{required: true, message: 'canteen is required', trigger: 'change'}],
        timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
        dish_price: [{
          validator: validateMoney,
          message: 'price must be a number with two decimal places',
          trigger: 'blur'
        },
          {required: true, message: 'price is required', trigger: 'blur'}],
        dish_name: [{required: true, message: 'dish_name is required', trigger: 'blur'}]
      },
      downloadLoading: false,
      NotifyDialog: false,
      valid: false,
      comments: []
    }
  },
  created() {
    this.getList()
    this.getCanteenList()
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      this.submitUpload()
      this.avatarUrl = URL.createObjectURL(file.raw);
      this.imgUrl = this.avatarUrl
    },
    submitUpload() {
      let file = this.$refs.upload.uploadFiles.pop().raw//这里获取上传的文件对象
      let formData = new FormData()
      formData.append("image", file)
      let query = axios.create({
        headers: {
          token: 'a7e9d40943d7d6876ed698cdd25dfb73'
        }
      })
      query.post("https://www.imgtp.com/api/upload", formData).then(res => {
        this.temp.dish_pic = res.data.data.url
        console.log(this.temp.dish_pic)
      })
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    },
    showAvatarDialog() {
      this.AvatarDialog = true
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list_length = Number(response.data.list_length)
        this.list = pageList(response.data.dish_list, this.listQuery.page, this.listQuery.limit)

        console.log(typeof (this.list_length))
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getCanteenList() {
      this.listLoading = true
      getCanteenList().then((res) => {
        this.canteenOptions = res.data.canteen_list
      })
    },
    showCanteenList() {
      this.canteenListVisible = true
    },
    showNotify() {
      this.NotifyDialog = true
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const {prop, order} = data
      if (prop === 'dish_id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort_by_id = '+id'
      } else {
        this.listQuery.sort_by_id = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        dish_id: undefined,
        dish_name: '',
        dish_price: 0,
        dish_star: 1,
        timestamp: new Date(),
        canteen_name: ''
      }

    },
    handleCreateCanteen() {
      this.dialogCanteenVisible = true
      this.canteenDialogStatus = 'create'
    },
    handleDeleteCanteen(row, index) {
      this.canteen = Object.assign({}, row)
      let Did = {
        canteen_id: this.canteen.canteen_id
      }
      deleteCanteen(Did).then(() => {
          this.list.splice(index, 1)
          this.getCanteenList()
        }
      )
      this.$notify({
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
    },
    createCanteenData() {
      let query = this.canteen
      createCanteen(query).then((res) => {
        this.getCanteenList()
      })
      this.$notify({
        title: 'Success',
        message: '添加成功',
        type: 'success',
        duration: 2000
      })
      this.dialogCanteenVisible = false
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.imgUrl = ''
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.dish_id = parseInt(Math.random() * 100) + 1024 // mock a id
          createDish(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.imgUrl = this.temp.dish_pic
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateDish(tempData).then(() => {
            const index = this.list.findIndex(v => v.dish_id === this.temp.dish_id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.temp = Object.assign({}, row)
      let Did = {
        dish_id: this.temp.dish_id
      }
      deleteDish(Did).then(() => {
          this.list.splice(index, 1)
        }
      )
      this.$notify({
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
    },
    handleUpdateComment(row) {
      this.commentDialogStatus = true
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'dish_name', 'canteen_name', 'dish_star', 'status']
        const filterVal = ['timestamp', 'dish_name', 'canteen_name', 'dish_star', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j], '')
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort_by_id
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleShowComment(row) {
      this.dialogCommentVisible = true
      this.handleGetComments(row)
    },
    handleGetComments(row) {
      let list_query = {user_id: this.user_id, dish_id: row.dish_id}
      getComments(list_query).then((response) => {
        let originData = response.data.comment_list
        console.log(originData)
        let o = {}
        this.$nextTick(() => {
          this.comments = []
          for (o in originData) {
            let comment = {
              comment_id: originData[o].comment_id,
              user_id: originData[o].user_id,
              action: '',
              headline: originData[o].user_name,
              title: '评论',
              subtitle: originData[o].comment_text,
              comment_star: originData[o].comment_star
            }
            this.comments.push(comment)
          }
        })
      })
    },
    handleDeleteComment(row, index) {
      let query = {
        comment_id: row.comment_id
      }
      deleteComment(query).then(() => {
        this.comments.splice(index, 1)
        this.$nextTick(() => {
          this.handleGetComments()
        })
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
  }
}
</script>
<style>
.el-button {
  color: white;
}

</style>
