import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@mdi/font/css/materialdesignicons.min.css'
import Element from 'element-ui'
// import { ElementTiptapPlugin } from 'element-tiptap'
import './styles/element-variables.scss'
// import 'element-tiptap/lib/index.css'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import vuetify from '@/plugins/vuetify' // path to vuetify export
import * as filters from './filters' // global filters
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs;
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Vuelidate from 'vuelidate'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
/*
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
*/

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})
Vue.use(mavonEditor)
// Vue.use(ElementTiptapPlugin, {
//   lang: 'zh'
// })

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.use(Antd)

new Vue({
  vuetify,
  el: '#app',
  router,
  store,
  render: h => h(App)
})
