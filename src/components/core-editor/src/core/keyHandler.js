/*
 * @Description: createKeyHandler
 * @Author: liuqiyu
 * @Date: 2019-12-05 14:31:21
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 11:43:46
 */
import mxgraph from './mxgraph'

const {
  mxKeyHandler,
  mxUtils,
  mxClient
} = mxgraph

export default function KeyHandler (CoreEditor) {
  this.editor = CoreEditor.editor
  this.init()
}

KeyHandler.prototype.init = function () {
  const graph = this.editor.graph
  const keyHandler = new mxKeyHandler(graph)
  // Binds keystrokes to actions
  keyHandler.bindAction = mxUtils.bind(this, function (code, control, key, shift) {
    let action = this.editor.editor.actions.actions[key]
    // var action = this.actions.get(key)
    if (action != null) {
      let f = function () {
        if (action.enabled) {
          action.funct()
        }
      }

      if (control) {
        if (shift) {
          keyHandler.bindControlShiftKey(code, f)
        } else {
          keyHandler.bindControlKey(code, f)
        }
      } else {
        if (shift) {
          keyHandler.bindShiftKey(code, f)
        } else {
          keyHandler.bindKey(code, f)
        }
      }
    }
  })

  // keyHandler.bindControlShiftKey(36, function () {
  //   graph.exitGroup()
  // }) // Ctrl+Shift+Home
  // keyHandler.bindControlShiftKey(35, function () {
  //   graph.enterGroup()
  // }) // Ctrl+Shift+End
  // keyHandler.bindKey(36, function () {
  //   graph.home()
  // }) // Home
  // keyHandler.bindKey(35, function () {
  //   graph.refresh()
  // }) // End

  // keyHandler.bindAction(80, true, 'print') // Ctrl+P
  // keyHandler.bindAction(79, true, 'outline', true) // Ctrl+Shift+O
  // keyHandler.bindAction(112, false, 'about') // F1

  keyHandler.bindAction(8, false, 'delete') // Backspace
  keyHandler.bindAction(8, true, 'deleteAll') // Backspace
  keyHandler.bindAction(46, false, 'delete') // Delete
  keyHandler.bindAction(46, true, 'deleteAll') // Ctrl+Delete

  keyHandler.bindAction(66, true, 'toBack', true) // Ctrl+Shift+B
  keyHandler.bindAction(68, true, 'duplicate') // Ctrl+D
  keyHandler.bindAction(70, true, 'toFront', true) // Ctrl+Shift+F
  keyHandler.bindAction(107, true, 'zoomIn') // Ctrl+Plus
  keyHandler.bindAction(109, true, 'zoomOut') // Ctrl+Minus
  keyHandler.bindAction(72, true, 'resetView') // Ctrl+H

  keyHandler.bindAction(88, true, 'cut') // Ctrl+X
  keyHandler.bindAction(67, true, 'copy') // Ctrl+C
  keyHandler.bindAction(86, true, 'paste') // Ctrl+V

  keyHandler.bindAction(90, true, 'undo') // Ctrl+Z
  if (!mxClient.IS_WIN) {
    keyHandler.bindAction(90, true, 'redo', true) // Ctrl+Shift+Z
  } else {
    keyHandler.bindAction(89, true, 'redo') // Ctrl+Y
  }

  keyHandler.bindAction(65, true, 'selectAll') // Ctrl+A
  keyHandler.bindAction(65, true, 'selectNone', true) // Ctrl+A
  keyHandler.bindAction(73, true, 'selectVertices', true) // Ctrl+Shift+I
  keyHandler.bindAction(69, true, 'selectEdges', true) // Ctrl+Shift+E

  // keyHandler.bindAction(18, true, 'pan', true) // Alt
}
