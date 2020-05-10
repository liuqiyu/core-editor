<!--
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-19 16:11:18
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 15:47:06
 -->
<template>
  <div>
    <div class="asp-dialog-body">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="40px"
               class="demo-ruleForm">
        <el-form-item label="id"
                      prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer"
         class="asp-dialog-footer">
      <el-button @click="$emit('close')">取消</el-button>
      <el-button @click="save"
                 type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['coreEditor'],
  data () {
    return {
      ruleForm: {
        id: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入id', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    command () {
      return this.coreEditor.command
    }
  },
  mounted () {
    this.$set(this.ruleForm, 'id', this.command.getCustomValue('id'))
  },
  methods: {
    save () {
      Object.keys(this.ruleForm).forEach(item => {
        console.log(item)
        if (this.ruleForm[item]) {
          this.command.setCustomValue(item, this.ruleForm[item])
        }
      })
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.asp-dialog-footer {
  text-align: right;
}
</style>
