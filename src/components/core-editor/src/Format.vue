<template>
  <div class="graph-format">
    <header class="title">编辑器</header>
    <div class="format-wrapper">
      <div style="padding-top: 200px; text-align: center; color: #ccc; font-size: 18px;">请选中元件</div>
      <!-- <div class="format-item">
        <div class="format-label">背景</div>
        <div class="format-content">
          <el-color-picker v-model="format.background"
                           size="mini"
                           @change="handleChangeStyle('background')"
                           show-alpha></el-color-picker>
        </div>
      </div> -->
      <!-- 字体 -->
      <!-- <div class="format-item">
        <div class="format-label">网格</div>
        <div class="format-content font">
          <el-input-number class="mini-input-number"
                           v-model="format.gridSize"
                           size="mini"
                           controls-position="right"
                           @change="handleChangeStyle('gridSize')"
                           :min="1"
                           :max="100"></el-input-number>
          <el-color-picker v-model="format.background"
                           size="mini"
                           @change="handleChangeStyle('background')"
                           show-alpha></el-color-picker>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'Format',
  data () {
    return {
      cells: null,
      fontStyleCheckbox: [],
      format: {
        background: '',
        gridSize: ''
      }
    }
  },
  mounted () {
    this.cells = []
  },
  methods: {
    // todo update style
    handleChangeStyle (keyword) {
      // CoreEditor.Format.updateStyleHandler(keyword, this.format)
    }
  }
}
</script>

<style lang="scss" scoped>
.graph-format {
  flex: none;
  height: 100%;
  background: #fff;
  border-left: 1px solid #e1e1e1;
  border-bottom: 1px solid #ebeef5;
  width: 241px;
  .title {
    height: 34px;
    background: #f6f6f6;
    line-height: 34px;
    text-indent: 12px;
    font-size: 14px;
    color: #333333;
  }
  .format-wrapper {
    padding-top: 10px;
    .format-item {
      display: flex;
      height: 30px;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      .format-label {
        width: 55px;
        flex: none;
        color: #666666;
      }
      .format-content {
        flex: 1;
        padding-left: 12px;
        display: flex;
        align-items: center;
        .character {
          font-size: 14px;
          font-weight: bold;
          padding: 0 5px;
        }
      }
    }
  }
}
::v-deep.mini-input-number {
  width: 60px;
  .el-input-number__decrease,
  .el-input-number__increase {
    width: 20px;
  }
  .el-input__inner {
    padding-left: 0px !important;
    padding-right: 20px !important;
  }
}
::v-deep.mini-checkbox-group {
  .el-checkbox-button__inner {
    padding: 5px 6px;
  }
}

::v-deep.mini-button-group {
  .el-button {
    padding: 7px 6px;
    .iconfont {
      font-size: 12px;
    }
  }
}
::v-deep .el-divider {
  margin: 12px 0;
}
</style>
