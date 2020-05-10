<!--
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-19 16:11:18
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 15:47:06
 -->
<template>
  <div>
    <div class="asp-dialog-body"
         style="height: 500px; overflow-y: auto">
      <div class="editor">
        <div id="graph"
             ref="graph"
             class="graph-container">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { CoreEditor } = AspCoreEditor
export default {
  props: {
    dialogData: {
      type: Object
    }
  },
  data () {
    return {
      coreEditor: null,
      graph: null
    }
  },
  mounted () {
    let container = this.$refs.graph
    this.coreEditor = new CoreEditor(container)
    let graph = this.coreEditor.editor.graph
    this.graph = graph
    this.graph.setEnabled(false) // 运行状态
    this.graph.panningHandler.useLeftButtonForPanning = true
    this.graph.panningHandler.ignoreCell = true
    this.graph.container.style.cursor = 'move'
    this.graph.setPanning(true)

    if (this.dialogData.xml) {
      this.renderXml(this.dialogData.xml)
    }
  },
  methods: {
    renderXml (value) {
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
