<!--
 * @Description: editor
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:35:07
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 16:49:02
 -->
<template>
  <div class="editor">
    <asp-core-editor :data="data"
                     :setEnabled="true"
                     @click="click"
                     @dblClick="dblClick"
                     @mouseDown="mouseDown"
                     @mouseUp="mouseUp"
                     @mouseMove="mouseMove"
                     @popupMenuHandler="popupMenuHandler">
    </asp-core-editor>
  </div>
</template>

<script>

console.log(AspCoreEditor)
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
.editor {
  height: 100%;
}
</style>
