<template>
  <v-app id="inspire">
    <v-dialog v-model="notify" width="700px" persistent verlay-opacity="0.1">
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

          <v-toolbar-title>通知</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="readAll" v-bind="attrs" v-on="on">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </template>
            <span>全部已读</span>
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
                        mdi-check
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
  </v-app>
</template>

<script>
import {read_one_notification, get_all_notification, clear_all_notification} from "@/api/notify";
import DOMPurify from "dompurify";
import {getToken} from "@/utils/auth";

export default {
  name: "NotifyDialog",
  props: {notify:Boolean},
  data() {
    return {
      items: [{
        "id": 1,
        "title": "退学通知",
        "content": "congratulations!你被退学啦哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
        "time": "2023-05-13 10:18:22",
        "category": 1,
        "status": 0
      },
        {
          "id": 2,
          "title": "退学通知",
          "content": "congratulations!你被退学啦哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
          "time": "2023-05-13 10:18:22",
          "category": 1,
          "status": 0
        },
        {
          "id": 6,
          "title": "退学通知",
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
      // TODO 目前 API 已对接，一次性传回了所有通知。下面分页的代码没太看懂，所以没改。
      // TODO 建议增加展示通知是否已读、通知类型、时间等字段，内容反而可以不展示
      let jwt = this.$store.state.user.token
      get_all_notification(getToken()).then(response => {
        console.log(response)
        this.list_length = response.data.notification_list.length
        let originData = response.data.notification_list
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
      let jwt = this.$store.state.user.token
      clear_all_notification(jwt).then(response => {
        console.log('clear')
      })
    },
    read(id) {
      let jwt = this.$store.state.user.token
      read_one_notification(jwt, id).then(response=>{
        console.log(response)
      }).catch(err=>{

      })
    },
    closeDialog() {
      this.$emit('close-dialog');
    },
  },
  created() {
    this.getList()
  },

}
</script>

<style scoped>

</style>
