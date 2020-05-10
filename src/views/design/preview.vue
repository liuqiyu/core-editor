<!--
 * @Description: 运行工具
 * @Author: liuqiyu
 * @Date: 2019-11-28 15:49:56
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 13:46:44
 -->

<template>
  <div class="editor">
      <div id="graph"
            ref="graph"
            class="graph-container">
      </div>
  </div>
</template>

<script>
const { CoreEditor } = AspCoreEditor
export default {
  data () {
    return {
      data: '',
      coreEditor: null,
      graph: null
    }
  },
  mounted () {
    this.data = localStorage.getItem('xml')
    let container = this.$refs.graph
    this.coreEditor = new CoreEditor(container)
    let graph = this.coreEditor.editor.graph
    this.graph = graph
    this.graph.setEnabled(false) // 运行状态
    this.graph.panningHandler.useLeftButtonForPanning = true
    this.graph.panningHandler.ignoreCell = true
    this.graph.container.style.cursor = 'move'
    this.graph.setPanning(true)

    if (this.data) {
      this.renderXml(this.data)
    }
  },
  methods: {
    renderXml (value) {
      console.log(value)
      if (value && this.graph) {
        this.coreEditor.editor.renderXml(value)
      }
    },
    click ({ graph, cell }) {
      graph.cellLabelChanged(cell, 123)
    },
    dblClick ({ graph, cell }) {
      console.log(graph)
      console.log(cell)
    }
  }
}
</script>
<style lang="scss" scoped>
.editor {
  height: 100%;
  .graph-container {
    height: 100%;
  }
}
</style>
