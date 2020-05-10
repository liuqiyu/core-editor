<!--
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-19 16:11:18
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 15:35:21
 -->
<template>
  <div>
    <div class="asp-dialog-body">
      <header class="title">快捷键</header>
      <section class="list">
        <el-row>
          <el-col :span="12"
                  v-for="(item, index) in list"
                  :key="index">
            <div class="item">
              <span class="name">{{item.name}}</span>
              <span class="value">{{item.value}}</span>
            </div>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          name: '放大',
          value: 'MouseWheel + '
        },
        {
          name: '缩小',
          value: 'MouseWheel - '
        },
        {
          name: '还原1:1',
          value: 'Ctrl + H '
        },
        {
          name: '取消操作',
          value: 'Ctrl+Z '
        },
        {
          name: '重做',
          value: 'Ctrl+Y'
        },
        {
          name: '复制',
          value: 'Ctrl+C'
        },
        {
          name: '粘贴',
          value: 'Ctrl+V'
        },
        {
          name: '移至最前',
          value: 'Ctrl+Shift+F'
        },
        {
          name: '移至最后',
          value: 'Ctrl+Shift+B'
        },
        {
          name: '删除',
          value: 'Delete'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
}
.list {
  padding: 10px;
  .item {
    font-size: 12px;
    margin-bottom: 5px;
    .name {
      display: inline-block;
      width: 80px;
    }
    .value {
    }
  }
}
</style>
