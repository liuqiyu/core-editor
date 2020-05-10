/*
 * @Description: PopupMenu
 * @Author: liuqiyu
 * @Date: 2019-11-12 16:09:52
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 11:44:17
 */
import mxgraph from './mxgraph'
const {
  mxUtils,
  mxClient,
  mxEvent
} = mxgraph

class PopupMenu {
  static editor = null
  static graph = null

  static init (editor, graph, container) {
    this.editor = editor
    this.graph = graph

    // 自定义右键
    const textEditing = mxUtils.bind(this, function (evt) {
      return this.graph.isEditing()
    })
    container.onselectstart = textEditing
    container.onmousedown = textEditing
    if (mxClient.IS_IE && (typeof (document.documentMode) === 'undefined' || document.documentMode < 9)) {
      mxEvent.addListener(container, 'contextmenu', textEditing)
    } else {
      container.oncontextmenu = textEditing
    }

    this.graph.popupMenuHandler.autoExpand = true

    this.graph.popupMenuHandler.isSelectOnPopup = function (me) {
      return mxEvent.isMouseEvent(me.getEvent())
    }
  }
}

export default PopupMenu
