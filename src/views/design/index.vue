<!--
 * @Description: editor
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:35:07
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 13:46:35
 -->
<template>
  <div class="design">
    <div class="editor">
      <core-editor :data="data"
                   :setEnabled="true"
                   @click="click"
                   @dblClick="dblClick"
                   @mouseDown="mouseDown"
                   @mouseUp="mouseUp"
                   @mouseMove="mouseMove"
                   @popupMenuHandler="popupMenuHandler"></core-editor>
    </div>
    <p class="copyright">Copyright © 2019 - 2020 Aspire. All Rights Reserved. Aspire 版权所有</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    this.data = localStorage.getItem('xml')
  },
  methods: {
    click ({ graph, cell }) {
      // alert('单击')
    },
    dblClick ({ graph, cell }) {
      // alert('双击')
    },
    mouseDown ({ graph, evt }) {

    },
    mouseUp ({ graph, evt }) {

    },
    mouseMove ({ graph, evt }) {

    },
    popupMenuHandler ({ menu, cell, evt }) {
      menu.addItem('绑定', null, () => {
        alert('绑定')
      })
      menu.addItem('绑定子图层', null, () => {
        alert('绑定')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.design {
  height: 100%;
  .editor {
    height: calc(100% - 30px);
  }
  .copyright {
    flex: none;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #5f6464;
  }
}
</style>
