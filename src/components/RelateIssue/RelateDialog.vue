<template>
  <v-app id="inspire">
    <v-dialog v-model="relate" width="700px" persistent overlay-opacity="0.1">
      <v-card
        max-width="700"
        class="mx-auto"
      >
        <v-toolbar
          color="#276678"
          dark
        >
          <v-btn icon @click="closeDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>关联问题</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="showAddDialog()" v-bind="attrs" v-on="on">
                <v-icon>mdi-brush</v-icon>
              </v-btn>
            </template>
            <span>添加关联问题</span>
          </v-tooltip>

        </v-toolbar>

        <v-list three-line dense>
          <template v-for="(item, index) in items">
            <v-divider
              v-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item
              v-else
              :key="item.id"
            >
              <template v-slot:default="{ active, toggle }">
                <v-list-item-content>
                  <v-col cols="10" class="mr-3">
                    <v-row>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-row>

                    <v-row>
                    <v-list-item-subtitle v-html="item.content"></v-list-item-subtitle>
                    </v-row>
                  </v-col>

                  <v-col cols="1">
                    <v-btn
                      @click="read(item.id)"
                      depressed
                      text
                      color="#1687A7"
                    >
                      <v-icon >
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-list-item-content>

              </template>
            </v-list-item>
          </template>
        </v-list>
        <v-pagination
          v-model="page_no"
          :length="notification_per_page"
          :total-visible="7"
        ></v-pagination>
      </v-card>
    </v-dialog>
    <AddRelateDialog :show="showAdd" @close-dialog="onCloseDialog"></AddRelateDialog>
  </v-app>
</template>

<script>
import {read_one_notification, get_all_notification, clear_all_notification} from "@/api/notify";
import {add_association, delete_association, get_association} from '@/api/issue_connect';
import DOMPurify from "dompurify";
import AddRelateDialog from "@/components/RelateIssue/AddRelateDialog";
export default {
  name: "RelateDialog",
  props: {relate:Boolean},
  components:{AddRelateDialog},
  data() {
    return {
      showAdd:false,
      items: [{
        "id": 6,
        "title": "相关问题",
        "content": "congratulations!你被退学啦哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
        "time": "2023-05-13 10:18:22",
        "category": 1,
        "status": 0
      },
        {
          "id": 6,
          "title": "相关问题",
          "content": "congratulations!你被退学啦哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
          "time": "2023-05-13 10:18:22",
          "category": 1,
          "status": 0
        },
        {
          "id": 6,
          "title": "相关问题",
          "content": "congratulations!你被退学啦哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
          "time": "2023-05-13 10:18:22",
          "category": 1,
          "status": 0
        }],
      page_no: 1,
      notification_per_page: 5
    }
  },
  methods: {
    getList() {
      //TODO 页数现在不确定
      let jwt = this.$store.state.user.token
      get_all_notification(jwt).then(response => {
        this.list_length = response.data.list_length
        let originData = response.data.notify_list
        console.log(originData)
        let divide = {divider: true, inset: true}
        let o
        this.$nextTick(() => {
          this.items = []
          for (o in originData) {
            this.items.push(originData[o])
            this.items.push(divide)
          }
          console.log(this.items)
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      })
    },
    slicecreate_time(str) {
      return str.substring(0, 10)
    },
    readAll() {
      //TODO 等待getList写好
      let jwt = this.$store.state.user.token
      clear_all_notification(jwt).then(response => {
        console.log('clear')
      })
    },
    read(id) {
      //TODO 等待getList写好
      let jwt = this.$store.state.user.token
      read_one_notification(jwt,id).then(response=>{

      }).catch(err=>{

      })
    },
    closeDialog() {
      this.$emit('close-dialog');
    },
    showAddDialog() {
      this.showAdd = true
    },
    onCloseDialog() {
      this.showAdd = false;
    }
  },
  created() {
    //this.getList()
  },

}
</script>

<style scoped>

</style>
