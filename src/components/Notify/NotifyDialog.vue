<template>
  <v-app id="inspire">
    <v-dialog v-model="notify" width="600px">
      <v-card
        max-width="600"
        class="mx-auto"
      >
        <v-toolbar
          color="orange lighten-2"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>通知</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="allRead()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
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
              :key="item.admin_name"
            >
              <v-list-item-avatar>
                <v-img :src="item.admin_pic"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.admin_name"></v-list-item-title>
                <v-list-item-subtitle>{{ slicecreate_time(item.create_time) }}</v-list-item-subtitle>
                <v-list-item-subtitle v-html="item.notify_text"></v-list-item-subtitle>
                <v-list-item-action style="margin-left: 400px;margin-top: -20px">
                  <v-btn text color="orange lighten-2" @click="read(item.notify_id)">已读</v-btn>
                </v-list-item-action>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>

      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "NotifyDialog",
  props: {
    notify: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    getList() {
      // fetchNotify(Did).then(response => {
      //   this.list_length = response.data.list_length
      //   let originData = response.data.notify_list
      //   console.log(originData)
      //   let divide = {divider: true, inset: true}
      //   let o
      //   this.$nextTick(() => {
      //     this.items = []
      //     for (o in originData) {
      //       this.items.push(originData[o])
      //       this.items.push(divide)
      //     }
      //     console.log(this.items)
      //     setTimeout(() => {
      //       this.listLoading = false
      //     }, 1.5 * 1000)
      //   })
      // })
    },
    slicecreate_time(str) {
      return str.substring(0, 10)
    },
    close() {

    },
    read(id) {
      let Did = {
        user_id: this.$store.state.user.user_id,
        notify_id: id
      }
      readNotify(Did).then(response => {
        this.getList()
      })
    },
    allRead() {

    }
  },
  created() {
    this.getList()
  },

}
</script>

<style scoped>

</style>
