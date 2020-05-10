/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-04 15:00:15
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-14 09:59:23
 */

import CoreGraph from './mxgraph'
import { Editor } from './editor'
import Actions from './actions'
import KeyHandler from './keyHandler'
import Command from './command'
import Sidebar from './sidebar'
import OutLine from './outLine'
import Utils from './utils'

const {
  mxUtils,
  mxClient
} = CoreGraph

function CoreEditor (container) {
  if (!mxClient.isBrowserSupported()) {
    // 判断是否支持mxgraph
    mxUtils.error('Browser is not supported!', 200, false)
  } else {
    /* eslint-disable no-new */
    this.editor = new Editor(this, container)
    this.actions = new Actions(this)
    this.keyHandler = new KeyHandler(this)
    this.sidebar = new Sidebar(this)
    this.command = new Command(this)
  }
}

CoreEditor.prototype.version = '1.1.0'

export {
  CoreEditor,
  OutLine,
  Utils,
  CoreGraph
}
