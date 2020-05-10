/*
 * @Description: core-editor
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:51:03
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 16:45:29
 */
import CoreEditor from './src/development'

/* istanbul ignore next */
CoreEditor.install = function (Vue) {
  Vue.component(CoreEditor.name, CoreEditor)
}

export default CoreEditor
