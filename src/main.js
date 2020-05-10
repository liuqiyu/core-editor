/*
 * @Description: main.js
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:35:07
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2019-12-30 15:12:36
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import '@babel/polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import CoreEditor from '@/components'
import './styles/index.scss'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'mini'
})
Vue.use(CoreEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
