<template>
  <div id="graph-wrapper">
    <Sidebar v-if="setEnabled"
             :coreEditor="coreEditor"
             id="graph-sidebar">
    </Sidebar>
    <div id="graph-map">
      <Toolbar id="graph-tool"
               :coreEditor="coreEditor"
               ref="toolbar"
               @renderXml="renderXml">
      </Toolbar>

      <div id="graph-content">
        <div id="graph"
             ref="graph"
             class="graph-container">
        </div>
        <div v-if="setEnabled"
             id="outlineContainer"
             ref="outlineContainer"
             style="z-index:1;position:absolute;overflow:hidden;top:0px;right:0px;width:220px;height:160px;background:#fff;border: 3px solid black;">
        </div>
      </div>
    </div>
    <div id="graph-sidebar"
         v-if="setEnabled">
      <components :is="currentFormat"
                  :coreEditor="coreEditor"
                  ref="format"></components>
    </div>
  </div>
</template>

<script>
import Toolbar from './Toolbar.vue'
import Format from './Format.vue'
import FormatShape from './FormatShape.vue'
import Sidebar from './Sidebar.vue'
import { CoreEditor, OutLine, CoreGraph } from './core'
const { mxEvent, mxUtils } = CoreGraph

export default {
  name: 'core-editor',
  props: {
    setEnabled: {
      type: Boolean,
      default: () => true
    },
    data: {
      type: String,
      default: () => ''
    }
  },
  watch: {
    data: {
      immediate: true,
      handler (value) {
        this.editorData = value
        this.renderXml(value)
      }
    }
  },
  data () {
    return {
      coreEditor: null,
      graph: null,
      currentFormat: 'Format',
      editorData: ''
    }
  },
  components: {
    Toolbar,
    Sidebar,
    Format,
    FormatShape
  },
  mounted () {
    let container = this.$refs.graph

    let outlineContainer = this.$refs.outlineContainer

    this.coreEditor = new CoreEditor(container, this.setEnabled)
    console.log(this.coreEditor.version)
    let graph = this.coreEditor.editor.graph

    this.graph = graph
    OutLine.init(graph, outlineContainer) //

    if (this.editorData) {
      this.renderXml(this.editorData)
    }

    graph.getSelectionModel().addListener('change', this.updateCells) // 选中元件
    graph.getModel().addListener('change', this.updateCells) // 拖动元件

    // 单击事件
    graph.addListener('click', (sender, evt) => {
      let cell = evt.getProperty('cell') // 元件
      this.$emit('click', { graph, cell })
    })

    // 双击事件
    graph.addListener('dblclick', (sender, evt) => {
      let cell = evt.getProperty('cell') // 元件
      this.$emit('dblClick', { graph, cell })
    })

    // 鼠标滚动
    const _t = this
    mxEvent.addMouseWheelListener(mxUtils.bind(this, function (evt, up) {
      if (!mxEvent.isConsumed(evt)) {
        if (up) {
          _t.coreEditor.command.actions('zoomIn')
        } else {
          _t.coreEditor.command.actions('zoomOut')
        }

        mxEvent.consume(evt, false, false) // 消耗给定的事件
      }
    }), container)

    // 鼠标移动事件
    graph.addMouseListener({
      // 鼠标按下
      mouseDown: (sender, evt) => {
        graph.container.style.cursor = 'grabbing'
        this.$emit('mouseDown', { graph, evt })
      },
      // 鼠标拿开
      mouseUp: (sender, evt) => {
        graph.container.style.cursor = 'pointer'
        this.$emit('mouseUp', { graph, evt })
      },
      // 鼠标移动
      mouseMove: mxUtils.bind(this, (sender, evt) => {
        this.$emit('mouseMove', { graph, evt })
      })
    })

    // 安装菜单 => 右键
    graph.popupMenuHandler.factoryMethod = (menu, cell, evt) => {
      // graph.isEnabled() 判断是否启用编辑
      if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
        if (cell) {
          menu.addItem('删除', null, () => {
            // Tool.delete()
          })
        }
        this.$emit('popupMenuHandler', { menu, cell, evt })
      }
    }
  },
  methods: {
    renderXml (value) {
      if (value && this.graph) {
        this.coreEditor.editor.renderXml(value)
      }
    },
    async updateCells () {
      let cell = this.graph.getSelectionCell()
      if (cell) {
        this.currentFormat = 'FormatShape'
        await this.$nextTick()
        this.$refs.format.selectionChanged(this.graph)
        this.$refs.toolbar._data.isSelect = true
      } else {
        this.currentFormat = 'Format'
        this.$refs.toolbar._data.isSelect = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/main.scss";
@import "./styles/common.css";

#graph-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  background: #ffffff;
  border: 1px solid #dee8f8;
  #graph-map {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    #graph-tool {
      flex: none;
      width: 100%;
    }
    #graph-content {
      position: relative;
      flex: 1;
      width: 100%;
      height: 100%;
      background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=");
      .graph-container {
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: default;
        touch-action: none;
        overflow: hidden;
      }
    }
  }
}
</style>
