/*
 * @Description: core-editor
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:51:03
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 16:47:48
 */
import AspCoreEditor from './src'

/* istanbul ignore next */
AspCoreEditor.install = function (Vue) {
  Vue.component(AspCoreEditor.name, AspCoreEditor)
}

export default AspCoreEditor
