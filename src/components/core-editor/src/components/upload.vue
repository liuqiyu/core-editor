<template>
  <div :title="value">
    <el-input style="vertical-align: unset;"
              :placeholder="placeholder"
              :value="fileName"
              clearable
              @clear="clear"
              :disabled="disabled"
              @input="input">
      <el-upload slot="append"
                 ref="upload"
                 action=""
                 :accept="currentAccept"
                 :show-file-list="false"
                 :data="formData"
                 :multiple="false"
                 :http-request="handleUpload"
                 :disabled="disabled">
        <el-button size="small"
                   type="primary"
                   style="color: #000;"
                   :loading="loading"
                   :disabled="loading">{{button}}</el-button>
      </el-upload>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'input-upload',
  props: {
    placeholder: {
      type: [String, Number],
      default: '点击上传文件'
    },
    accept: {
      type: Array,
      default: null
    },
    Size: {
      type: [String, Number],
      default: 2
    },
    button: {
      type: String,
      default: '上传'
    },
    formData: {
      type: Object,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: [String, Number]
  },
  // 是否只返回叶子节点，多选可用
  data () {
    return {
      loading: false,
      show: false,
      fileName: '',
      file: '',
      accepts: {
        excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/kset',
        word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/kswps',
        pdf: 'application/pdf, application/kswps',
        image: 'image/gif, image/jpeg, image/png, image/x-ms-bmp',
        zip: 'application/zip, application/x-zip-compressed',
        ppt: `application/vnd.ms-powerpoint,
            application/vnd.ms-powerpoint,
            application/vnd.ms-powerpoint,
            application/vnd.openxmlformats-officedocument.presentationml.template,
            application/vnd.openxmlformats-officedocument.presentationml.slideshow,
            application/vnd.openxmlformats-officedocument.presentationml.presentation`
      }
    }
  },
  computed: {
    currentAccept () {
      if (this.accept) {
        return this.accept.map(k => this.accepts[k]).join(',')
      }
      return ''
    }
  },
  watch: {
    value (val) {
      this.fileName = val
    }
  },
  methods: {
    clear () {
      this.$emit('clear')
    },
    input (e) {
      console.log(e)
      this.fileName = e
    },
    async handleUpload (params) {
      if (Number(this.Size) * 1024 * 1024 > params.file.size) {
        this.loading = true
        const file = params.file
        let reader = new FileReader() // html5读文件
        reader.readAsDataURL(file) // 转BASE64
        reader.onload = (e) => {
          this.$emit('input', file.name)
          this.$emit('onSuccess', {
            filename: file.name,
            file: e.target.result
          })
          this.loading = false
        }
      } else {
        this.$message(`文件大小超出${this.Size}M`)
      }
    }
  },
  mounted () {
    this.fileName = this.value
  }
}
</script>

<style lang="scss" scoped>
</style>
