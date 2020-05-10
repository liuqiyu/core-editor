/*
 * @Description: router
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:35:07
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 16:50:38
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'development',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/dashboard')
  },
  {
    path: '/design',
    name: 'design',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/design')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/admin')
  },
  {
    path: '/template',
    name: 'template',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/template')
  },
  {
    path: '/production',
    name: 'production',
    component: () => import(/* webpackChunkName: "editor" */ '@/views/design/production')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import(/* webpackChunkName: "preview" */ '@/views/design/preview')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
