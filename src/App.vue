<!--
 * @Description: App
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:35:07
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 17:11:40
 -->
<template>
  <div id="app">
    <div class="topbar">
      <div class="logo">
        <img style="height: 40px;"
             src="./images/logo.png"
             alt="">
      </div>
      <ul class="top-menu">
        <li class="top-menu-item"
            :class="{active: $route.path === item.path}"
            v-for="(item, index) in menuList"
            @click="handleTo(item)"
            :key="index">{{item.label}}</li>
      </ul>
    </div>
    <div class="router-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          path: '/',
          label: '首页'
        },
        {
          path: '/design',
          label: '设计'
        },
        {
          path: 'https://www.yuque.com/books/share/cec83d02-15d0-42ed-9460-f58764705de7/geea10',
          label: '文档',
          isLink: true
        }
        // {
        //   path: '/admin',
        //   label: '管理'
        // },
        // {
        //   path: '/template',
        //   label: '模板'
        // }
      ]
    }
  },
  methods: {
    handleTo (item) {
      console.log(item)
      if (item.isLink) {
        window.open(item.path)
      } else {
        this.$router.push({
          path: item.path
        })
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 56px;
  text-align: center;
  line-height: 56px;
  background: #020304;
  display: flex;
  padding: 0 20px;
  .logo {
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .top-menu {
    display: flex;
    margin-left: 150px;
    .top-menu-item {
      font-size: 14px;
      padding: 0 20px;
      color: #a0a2ad;
      margin-right: 20px;
      cursor: pointer;
      &.active,
      &:hover {
        background: #0d1218;
        color: #fff;
        font-weight: 400;
      }
    }
  }
}

.router-wrapper {
  width: 100%;
  height: calc(100% - 56px);
}
</style>
