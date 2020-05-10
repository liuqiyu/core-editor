/*
 * @Description: actions
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 11:42:11
 */
import mxgraph from './mxgraph'
import { ctrlKey } from './constant'
const {
  mxCodec,
  mxResources,
  mxEventSource,
  mxUtils,
  mxEvent,
  mxClient,
  mxUndoManager,
  mxClipboard
} = mxgraph

function Actions (CoreEditor) {
  this.editor = CoreEditor.editor
  this.actions = {}
  this.init()
}

Actions.prototype.init = function () {
  const graph = this.editor.graph

  const undoManager = new mxUndoManager()
  graph.getModel().addListener(mxEvent.UNDO, _listener)
  graph.getView().addListener(mxEvent.UNDO, _listener)

  this.addAction('readXml', function (filename) {
    let req = mxUtils.load(filename)
    let root = req.getDocumentElement()
    let dec = new mxCodec(root.ownerDocument)

    dec.decode(root, graph.getModel())
  }, null, 'sprite-undo', null)

  this.addAction('undo', function () { undoManager.undo() }, null, 'sprite-undo', ctrlKey + '+Z')
  this.addAction('redo', function () { undoManager.redo() }, null, 'sprite-redo', (!mxClient.IS_WIN) ? ctrlKey + '+Shift+Z' : ctrlKey + '+Y')

  // 组合
  this.addAction('toBack', function () { graph.orderCells(true) }, null, null, ctrlKey + '+Shift+B')
  this.addAction('group', function () {
    if (graph.getSelectionCount() === 1) {
      graph.setCellStyles('container', '1')
    } else {
      graph.setSelectionCell(graph.groupCells(null, 0))
    }
  }, null, null, ctrlKey + '+G')
  this.addAction('ungroup', function () {
    if (graph.getSelectionCount() === 1 && graph.getModel().getChildCount(graph.getSelectionCell()) === 0) {
      graph.setCellStyles('container', '0')
    } else {
      graph.setSelectionCells(graph.ungroupCells())
    }
  }, null, null, ctrlKey + '+Shift+U')

  this.addAction('alignCells', function (evt) { graph.alignCells(evt) }, null, null, null) // 对齐 左、居中、右、顶、垂直居中、底
  this.addAction('flipCells', function (evt) { graph.toggleCellStyles(evt, false) }, null, null, null) // 翻转

  this.addAction('resetView', function () { graph.zoomTo(1) }, null, null, ctrlKey + '+H') // 1:1 还原
  this.addAction('zoomIn', function (evt) { graph.zoomIn() }, null, null, ctrlKey + ' + (Numpad) / Alt+Mousewheel') // 放大
  this.addAction('zoomOut', function (evt) { graph.zoomOut() }, null, null, ctrlKey + ' - (Numpad) / Alt+Mousewheel') // 缩小
  this.addAction('toFront', function () { graph.orderCells(false) }, null, null, ctrlKey + '+Shift+F') // 移至最前
  this.addAction('toBack', function () { graph.orderCells(true) }, null, null, ctrlKey + '+Shift+B') // 移至最后

  this.addAction('delete', function (evt) { deleteCells(evt != null && mxEvent.isShiftDown(evt)) }, null, null, 'Delete') // 刪除
  this.addAction('deleteAll', function () { deleteCells(true) }, null, null, ctrlKey + '+Delete') // 删除全部
  this.addAction('duplicate', function () { graph.setSelectionCells(graph.duplicateCells()) }, null, null, ctrlKey + '+D') // 复印

  this.addAction('selectVertices', function () { graph.selectVertices() }, null, null, ctrlKey + '+Shift+I') // 选中全部图形
  this.addAction('selectEdges', function () { graph.selectEdges() }, null, null, ctrlKey + '+Shift+E') // 选中所有连线
  this.addAction('selectAll', function () { graph.selectAll(null, true) }, null, null, ctrlKey + '+A') // 选中所有
  this.addAction('selectNone', function () { graph.clearSelection() }, null, null, ctrlKey + '+Shift+A') // 取消选中

  this.addAction('cut', function () { mxClipboard.cut(graph) }, null, 'null', ctrlKey + '+X') // 剪切
  this.addAction('copy', function () { mxClipboard.copy(graph) }, null, 'null', ctrlKey + '+C') // 复制
  this.addAction('paste', function () {
    if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
      mxClipboard.paste(graph)
    }
  }, null, 'null', ctrlKey + '+V') // 粘贴

  this.addAction('edit', function () {
    if (graph.isEnabled()) {
      graph.startEditingAtCell()
    }
  }, null, null, 'F2/Enter')

  this.addAction('horizontal', function () { _distributeCells(true) }, null, null, null) // 等距分布 水平
  this.addAction('vertical', function () { _distributeCells(false) }, null, null, null) // 等距分布 垂直

  this.addAction('exportImg', function () {
    alert('导出图片')
    let width = 1000
    let height = 1000
    let type = 'png'
    let name = '下载'
    let serializer = new XMLSerializer()
    let node = document.getElementById('graph').getElementsByTagName('svg')[0]
    console.log(node)
    let source = serializer.serializeToString(node)
    let image = new Image()
    image.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(source)))
    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    let context = canvas.getContext('2d')
    context.fillStyle = '#fff'
    context.fillRect(0, 0, 10000, 10000)
    image.onload = function () {
      context.drawImage(image, 0, 0)
      let a = document.createElement('a')
      a.download = `${name}.${type}`
      a.href = canvas.toDataURL(`image/${type}`)
      a.click()
    }
  }, null, null, null) // 导出图片PNG

  // 移动 pan
  this.addAction('pan', function (status) {
    graph.panningHandler.isForcePanningEvent = me => {
      graph.container.style.cursor = status ? 'move' : null
      return status
    }
  }, null, null, 'Alt')

  this.addAction('exportXml', function (name) {
    let encoder = new mxCodec()
    let xx = encoder.encode(graph.getModel())
    const getXml = mxUtils.getXml(xx)
    let element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(getXml))
    element.setAttribute('download', `${name}.xml`)
    element.style.display = 'none'
    document.body.appendChild(element)
    let blob = new Blob([getXml])
    element.href = URL.createObjectURL(blob)
    element.click()
    document.body.removeChild(element)
  }, null, 'null', ctrlKey + '+X') // 导出xml

  // 删除操作
  function deleteCells (includeEdges) {
    // 取消交互操作
    graph.escape()
    let cells = graph.getDeletableCells(graph.getSelectionCells())

    if (cells != null && cells.length > 0) {
      let parents = graph.model.getParents(cells)
      graph.removeCells(cells, includeEdges)

      // Selects parents for easier editing of groups
      if (parents != null) {
        let select = []

        for (let i = 0; i < parents.length; i++) {
          if (graph.model.contains(parents[i]) &&
            (graph.model.isVertex(parents[i]) ||
              graph.model.isEdge(parents[i]))) {
            select.push(parents[i])
          }
        }

        graph.setSelectionCells(select)
      }
    }
  };

  function _listener (sender, evt) {
    undoManager.undoableEditHappened(evt.getProperty('edit'))
  }

  //   // 等距分布
  function _distributeCells (horizontal, cells) {
    if (cells == null) {
      cells = graph.getSelectionCells()
    }

    if (cells != null && cells.length > 1) {
      let vertices = []
      let max = null
      let min = null

      for (let i = 0; i < cells.length; i++) {
        if (graph.getModel().isVertex(cells[i])) {
          let state = graph.view.getState(cells[i])

          if (state != null) {
            let tmp = horizontal ? state.getCenterX() : state.getCenterY()
            max = max != null ? Math.max(max, tmp) : tmp
            min = min != null ? Math.min(min, tmp) : tmp

            vertices.push(state)
          }
        }
      }

      if (vertices.length > 2) {
        vertices.sort(function (a, b) {
          return horizontal ? a.x - b.x : a.y - b.y
        })

        let t = graph.view.translate
        let s = graph.view.scale

        min = min / s - (horizontal ? t.x : t.y)
        max = max / s - (horizontal ? t.x : t.y)

        graph.getModel().beginUpdate()
        try {
          let dt = (max - min) / (vertices.length - 1)
          let t0 = min

          for (let i = 1; i < vertices.length - 1; i++) {
            let pstate = graph.view.getState(
              graph.model.getParent(vertices[i].cell)
            )
            let geo = graph.getCellGeometry(vertices[i].cell)
            t0 += dt

            if (geo != null && pstate != null) {
              geo = geo.clone()

              if (horizontal) {
                geo.x = Math.round(t0 - geo.width / 2) - pstate.origin.x
              } else {
                geo.y = Math.round(t0 - geo.height / 2) - pstate.origin.y
              }

              graph.getModel().setGeometry(vertices[i].cell, geo)
            }
          }
        } finally {
          graph.getModel().endUpdate()
        }
      }
    }

    return cells
  }
}

/**
 * 在给定的名称下注册给定的操作。
 */
Actions.prototype.addAction = function (key, funct, enabled, iconCls, shortcut) {
  let title

  if (key.substring(key.length - 3) === '...') {
    key = key.substring(0, key.length - 3)
    title = mxResources.get(key) + '...'
  } else {
    title = mxResources.get(key)
  }

  return this.put(key, new Action(title, funct, enabled, iconCls, shortcut))
}

/**
 * 在给定的名称下注册给定的操作。
 */
Actions.prototype.put = function (name, action) {
  this.actions[name] = action

  return action
}

/**
 * 如果没有这样的动作，返回给定名称的动作或NULL。
 */
Actions.prototype.get = function (name) {
  return this.actions[name]
}

/**
 * 为给定参数构造新操作。
 */
function Action (label, funct, enabled, iconCls, shortcut) {
  mxEventSource.call(this)
  this.label = label
  this.funct = this.createFunction(funct)
  this.enabled = (enabled != null) ? enabled : true
  this.iconCls = iconCls
  this.shortcut = shortcut
  this.visible = true
};

// 操作继承自mxEventSource
mxUtils.extend(Action, mxEventSource)

Action.prototype.createFunction = function (funct) {
  return funct
}

export default Actions
