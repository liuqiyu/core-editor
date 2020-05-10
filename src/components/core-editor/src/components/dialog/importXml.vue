<!--
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-19 16:11:18
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 14:51:11
 -->
<template>
  <div>
    <div class="asp-dialog-body">
      <el-upload class="upload-demo"
                 action=""
                 :http-request="handleBeforeUpload"
                 :on-remove="handleRemove"
                 :file-list="fileList">
        <el-button size="small"
                   type="primary">点击上传</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传.xml文件</div>
      </el-upload>
    </div>
    <div slot="footer"
         class="asp-dialog-footer">
      <el-button @click="save"
                 type="primary"
                 :disabled="disabled">保存</el-button>
      <el-button @click="$emit('close')">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileList: [],
      xml: '',
      disabled: true
    }
  },
  watch: {
    xml (val) {
      if (val.length > 0) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  },
  methods: {
    save () {
      this.$emit('importXml', this.xml)
      this.$emit('close')
    },
    handleBeforeUpload (params) {
      let self = this
      const flie = params.file
      let x = new FileReader()
      x.readAsText(flie, 'UTF-8')
      x.onloadend = function (ev) {
        self.xml = x.result
      }
    },
    handleRemove (file, fileList) {
      this.xml = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.asp-dialog-footer {
  text-align: right;
}
</style>
