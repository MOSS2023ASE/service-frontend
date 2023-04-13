<template>
  <v-app>
    <v-app-bar clipped app class="navbar" color="deep orange">
      <!--    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"-->
      <!--               @toggleClick="toggleSideBar"/>-->
      <v-row dense>
        <v-col cols="2">
          <v-row>
            <span class="title ml-3 mr-5" style="margin-top: 8px;">
              士问
            </span>
          </v-row>
          <v-row>
            <span class="title ml-3 mr-5" style="margin-left: 20px !important;">
              士答
            </span>
          </v-row>
        </v-col>
        <v-col cols="2" style="margin-left: -60px">
          <v-img src="logo.jpg" style="vertical-align:middle;max-height: 100px;max-width: 50px;"></v-img>
        </v-col>
      </v-row>
      <!--    <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>-->
      <v-spacer></v-spacer>
      <div class="right-menu">
        <template v-if="device!=='mobile'">

<!--          <search id="header-search" class="right-menu-item"/>-->

          <error-log class="errLog-container right-menu-item hover-effect"/>

          <screenfull id="screenfull" class="right-menu-item hover-effect"/>

<!--          <el-tooltip content="Global Size" effect="light" placement="bottom">-->
<!--            <size-select id="size-select" class="right-menu-item hover-effect"/>-->
<!--          </el-tooltip>-->

        </template>

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" alt="">
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/index2">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <router-link to="/userInfo">
              <el-dropdown-item>我的信息</el-dropdown-item>
            </router-link>
            <router-link to="/favorDish">
              <el-dropdown-item>我的收藏</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="showNotify">我的通知</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>


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

              <v-btn icon>
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
    </v-app-bar>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import variables from '@/styles/variables.scss'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    SidebarItem
  },
  data() {
    return {
      notify: false,
      list_length: 0,
      items: [],
      page: 0,
      itemsPerPage: 4
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'permission_routes'
    ]),
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    read(id){
      let Did = {
        user_id: this.$store.state.user.user_id,
        notify_id:id
      }
      // readNotify(Did).then(response => {
      //   this.getList()
      // })
    },
    showNotify() {
      console.log("haha")
      this.notify = true
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    slicecreate_time(str) {
      return str.substring(0, 10)
    },

    getList() {
      let Did = {
        user_id:this.$store.state.user.user_id
      }
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

  }
}
</script>

<style lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  background: linear-gradient(to right, #FF9C00 0%, #E2D41F 100%);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
