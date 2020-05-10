/*
 * @Description: 入口
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:48:23
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 16:49:54
 */
import CoreEditor from './core-editor/index-development'
import AspCoreEditor from './core-editor/index-production'
import AspDialog from './asp-dialog'

const components = [CoreEditor, AspCoreEditor, AspDialog]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
