<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>

    <el-header>
      <div :class="{hasTagsView:needTagsView}">
        <div :class="{'fixed-header':fixedHeader}" class="main-container">
          <navbar/>
        </div>
      </div>
    </el-header>

    <el-container>
      <sidebar class="sidebar-container"/>
      <el-main>
        <div :class="{hasTagsView:needTagsView}" class="main-container">
          <!--        <tags-view v-if="needTagsView" />-->
          <app-main/>
          <!--      <right-panel v-if="showSettings">-->
          <!--        <settings />-->
          <!--      </right-panel>-->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import {AppMain, Navbar, Settings, Sidebar, TagsView} from './components'
import ResizeMixin from './mixin/ResizeHandler'
import {mapGetters, mapState} from 'vuex'
import SidebarItem from "@/layout/components/Sidebar/SidebarItem";

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    SidebarItem
  },
  mixins: [ResizeMixin],
  ...mapGetters([
    'permission_routes',
    'sidebar'
  ]),
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {
    this.$store.dispatch('user/forceGetInfo')////如果后端支持权限改成getInfo
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}

#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
