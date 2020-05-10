<template>
  <div class="graph-tool">
    <el-button @click="actions('zoomIn')"
               type="text"
               title="放大"
               icon="iconfont iconfangda"></el-button>

    <el-button @click="actions('zoomOut')"
               type="text"
               title="缩小"
               icon="iconfont iconsuoxiao1"></el-button>

    <el-button @click="actions('resetView')"
               type="text"
               title="还原1:1"
               icon="iconfont iconrestore"></el-button>

    <div class="separator"></div>

    <el-button @click="actions('undo')"
               type="text"
               title="取消操作（Ctrl+Z）"
               icon="iconfont iconundo"></el-button>

    <el-button @click="actions('redo')"
               type="text"
               title="重做（Ctrl+Y）"
               icon="iconfont iconredo"></el-button>

    <div class="separator"></div>

    <el-button @click="handlePan"
               type="text"
               title="拖动"
               :class="this.panStatus ? 'finger-select': null "
               icon="iconfont icontuodong1"></el-button>

    <div class="separator"></div>

    <el-button @click="actions('copy')"
               type="text"
               title="复制（Ctrl+C）"
               :disabled="!isSelect"
               icon="iconfont iconfuzhi"></el-button>

    <el-button @click="actions('paste')"
               type="text"
               title="粘贴（Ctrl+V）"
               icon="iconfont iconniantie2"></el-button>

    <div class="separator"></div>

    <el-button @click="actions('toFront')"
               type="text"
               title="移至最前（Ctrl+Shift+F）"
               :disabled="!isSelect"
               icon="iconfont iconzuiqiankong"></el-button>

    <el-button @click="actions('toBack')"
               type="text"
               title="移至最后（Ctrl+Shift+B）"
               :disabled="!isSelect"
               icon="iconfont iconzuihoukong"></el-button>

    <div class="separator"></div>

    <el-button @click="handleShowXml"
               type="text"
               title="数据预览"
               icon="iconfont iconXML"></el-button>

    <el-button @click="actions('delete')"
               type="text"
               title="删除（Delete）"
               :disabled="!isSelect"
               icon="iconfont iconshanchu"></el-button>

    <div class="separator"></div>

    <el-button @click="importXml"
               type="text"
               title="导入XML"
               icon="iconfont icondaoru2"></el-button>

    <el-button @click="actions('exportXml', '你好')"
               type="text"
               title="导出XML"
               icon="iconfont iconexport-xml"></el-button>

    <el-button @click="actions('exportImg')"
               type="text"
               title="导出图片"
               icon="iconfont icondaochutupian"></el-button>

    <div class="separator"></div>

    <el-button @click="handleBind"
               type="text"
               title="绑定"
               :disabled="!isSelect"
               icon="iconfont iconbangding"></el-button>

    <el-button @click="handleSave"
               type="text"
               title="保存"
               icon="iconfont iconbaocun2"></el-button>

    <el-button @click="handlePreview"
               type="text"
               title="预览"
               icon="iconfont iconyulan"></el-button>

    <el-button @click="handleHelp"
               type="text"
               title="帮助"
               icon="iconfont iconiconfontbangzhu"></el-button>
    <el-button @click="handleAbout"
               type="text"
               title="关于我们"
               icon="iconfont iconziyuan"></el-button>
    <!--弹出框-->
    <asp-dialog v-bind="dialogOption"
                :view.sync="dialogOption.view"
                :visible.sync="dialogOption.show">
      <component :is="dialogOption.view"
                 :dialog-data="dialogData"
                 :coreEditor="coreEditor"
                 @close="closeDynamicDialog">
      </component>
    </asp-dialog>
  </div>
</template>

<script>
import importXml from './components/dialog/importXml'
import help from './components/dialog/help'
import about from './components/dialog/about'
import bind from './components/dialog/bind'
import preview from './components/dialog/preview'

export default {
  name: 'Toolbar',
  components: {
    importXml,
    help,
    about,
    bind,
    preview
  },
  props: ['coreEditor'],
  computed: {
    command () {
      return this.coreEditor.command
    }
  },
  data () {
    return {
      dialogOption: {
        show: false,
        view: null,
        title: '',
        width: '1200px'
      },
      dialogData: {},
      panStatus: false,
      currentComponent: null,
      isEmpty: true,
      isSelect: false,
      data: null
    }
  },
  methods: {
    actions (name, para) {
      console.log(para)
      this.command.actions(name, para)
    },
    // 拖动
    handlePan () {
      this.panStatus = !this.panStatus
      this.command.actions('pan', this.panStatus)
    },
    handleShowXml () {
      this.command.showXml()
    },
    handleSave () {
      this.command.save((xml, graph) => {
        console.log(xml)
        localStorage.setItem('xml', xml)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    },
    handleHelp () {
      this.showDynamicDialog('help', '帮助', '600px')
    },
    handleAbout () {
      this.showDynamicDialog('about', '导入', '400px')
    },
    importXml () {
      this.showDynamicDialog('importXml', '导入', '500px')
    },
    close () {
      this.dialogVisible = false
      this.dialogTitle = null
      this.dialogWidth = ''
      this.currentComponent = null
    },
    renderXml (xml) {
      this.$emit('renderXml', xml)
    },
    handleBind () {
      this.showDynamicDialog('bind', '绑定', '500px')
    },
    handlePreview () {
      this.$set(this.dialogData, 'xml', this.command.getData())
      this.showDynamicDialog('preview', '预览', '1200px')
    },
    showDynamicDialog (view, title, width = '1200px') {
      this.dialogOption.show = true
      this.dialogOption.view = view
      this.dialogOption.title = title
      this.dialogOption.width = width
    },
    closeDynamicDialog (boolean) {
      if (boolean) {
        this.$refs.queryTable.loadTable()
      }
      this.dialogOption.show = false
      this.dialogOption.view = null
      this.dialogOption.title = null
      this.dialogOption.width = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.graph-tool {
  height: 34px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  background: #f6f6f6;
  border-bottom: 1px solid #e0e0e0;
  .finger-select {
    opacity: 0.5;
  }
  .el-button {
    color: #444;
    margin: 0 6px;
    &.is-disabled {
      color: #c0c4cc;
    }
  }
  .separator {
    width: 1px;
    height: 34px;
    background: rgba(0, 0, 0, 0.1);
    margin-left: 6px;
    margin-right: 6px;
    margin-top: -2px;
  }
}
.asp-dialog {
  ::v-deep .el-dialog__body {
    padding: 10px 20px 15px 20px !important;
  }
}
</style>
