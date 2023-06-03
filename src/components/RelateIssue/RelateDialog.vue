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

          <v-tooltip top v-if="this.allow_relate === 1">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="showAddDialog()" v-bind="attrs" v-on="on">
                <v-icon>mdi-brush</v-icon>
              </v-btn>
            </template>
            <span>添加关联问题</span>
          </v-tooltip>

        </v-toolbar>

        <v-list three-line dense>
          <template v-for="(item, index) in currentPageItems">
            <v-divider
              v-if="item.divider"
              :key="index"

            ></v-divider>

            <v-list-item
              v-else
              :key="index"
            >
              <template v-slot:default="{ active, toggle }">
                <v-list-item-content>
                  <v-col :cols="col" class="mr-3">
                    <v-row class="mb-3">
                      <v-list-item-title class="text-subtitle-1">{{ item.issue_title }} (id:{{ item.issue_id }})</v-list-item-title>
                    </v-row>

                    <v-row class="mb-3">
                      <v-list-item-subtitle v-text="getAbstrct(item.content)" class="text-subtitle-2"></v-list-item-subtitle>
                    </v-row>

                    <v-row style="margin-left: -30px;">
                      <v-btn text color="blue">{{ item.subject_name }}</v-btn>
                      <v-btn text color="blue">{{ item.chapter_name }}</v-btn>
                    </v-row>
                  </v-col>

                  <v-col cols="1" v-if="allow_relate === 1">
                    <v-btn
                      @click="deleteOne(item.issue_id)"
                      depressed
                      text
                      color="#1687A7"
                    >
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="1">
                    <v-btn
                      @click="goTo(item.issue_id)"
                      depressed
                      text
                      color="#1687A7"
                    >
                      <v-icon>
                        mdi-magnify
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
          :length="totalPages"
          :total-visible="7"
        ></v-pagination>
      </v-card>
    </v-dialog>
    <AddRelateDialog :show="showAdd" :id="this.id" @close-dialog="onCloseDialog"
                     @update-dialog="update"></AddRelateDialog>
  </v-app>
</template>

<script>
import {add_association, delete_association, get_association} from '@/api/issue_connect';
import DOMPurify from "dompurify";
import AddRelateDialog from "@/components/RelateIssue/AddRelateDialog";

export default {
  name: "RelateDialog",
  props: {relate: Boolean, id: Number, allow_relate: Number, items: Array,list_length:Number},
  components: {AddRelateDialog},
  data() {
    return {
      showAdd: false,
      page_no: 1,
      pageSize: 5,
    }
  },
  methods: {


    slicecreate_time(str) {
      return str.substring(0, 10)
    },

    deleteOne(relate_id) {

      let jwt = this.$store.state.user.token
      delete_association(jwt, this.id, relate_id).then(response => {
        this.$emit('update-dialog');
      }).catch(err => {

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
    },
    getAbstrct(content) {
      return content.length > 16 ?
        content.slice(0, 15) + '...' :
        content
    },
    goTo(id) {
      this.$emit('close-dialog');
      this.$router.push({name: 'issueInfoDetail', query: {issue_id: id}})
    },
    update(){
      this.$emit('update-dialog');
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.list_length / this.pageSize); // 总页数
    },
    col(){
      return this.allow_relate === 1? 9:10;
    },
    currentPageItems() {
      const start = (this.page_no - 1) * this.pageSize; // 当前页的起始项索引
      const end = start + this.pageSize; // 当前页的结束项索引
      return this.items.slice(start*2, end*2); // 返回当前页的时间线项
    },
  }

}
</script>

<style scoped>

</style>
