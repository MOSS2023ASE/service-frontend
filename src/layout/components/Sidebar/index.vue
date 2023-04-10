<template>
  <div class="ma-1 pa-12">
    <v-navigation-drawer
      mini-variant
      app
      style="background-color:#d2691E;">
      <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse"/>
        <!--        <el-scrollbar wrap-class="scrollbar-wrapper">-->
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item v-for="(route, index) in permission_routes" :key="index" :item="route" :base-path="route.path"/>
        </el-menu>
        <!--        </el-scrollbar>-->
      </div>
<!--      <v-list-item align-self="end">-->
<!--        <v-btn-->
<!--          icon-->
<!--          @click="handleLogOut()">-->
<!--          <v-icon>-->
<!--            mdi-close-->
<!--          </v-icon>-->
<!--        </v-btn>-->

<!--      </v-list-item>-->
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: {SidebarItem, Logo},
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const {meta, path} = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    },
    async handleLogOut() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
