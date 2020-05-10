/*
 * @Description: create sidebar
 * @Author: liuqiyu
 * @Date: 2019-12-05 14:31:21
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-14 09:59:01
 */
import mxgraph from './mxgraph'

const {
  mxUtils,
  mxEvent,
  mxCell,
  mxGeometry,
  mxPoint
} = mxgraph

export default function Sidebar (CoreEditor, container) {
  this.editor = CoreEditor.editor
  this.graph = this.editor.graph
}

Sidebar.prototype.createDragSource = function (ele, type, width, height, value, style, src, labelPosition) {
  const _dropGraph = evt => {
    const x = mxEvent.getClientX(evt)
    const y = mxEvent.getClientY(evt)
    // 获取 x,y 所在的元素
    const elt = document.elementFromPoint(x, y)
    // 如果鼠标落在graph容器
    if (mxUtils.isAncestorNode(this.graph.container, elt)) {
      return this.graph
    }
    // 鼠标落在其他地方
    return null
  }

  if (labelPosition) {
    labelPosition = labelPosition.split(',')
    let labelPositionStr = `;labelPosition=${labelPosition[0]};verticalLabelPosition=${labelPosition[1]};align=${labelPosition[2]};verticalAlign=${labelPosition[3]};`
    style += labelPositionStr
  } else if (!labelPosition && type === 'image') {
    // 文本默认的对齐方式
    labelPosition = ['left', 'middle', 'right', 'middle']
    let labelPositionStr = `;labelPosition=${labelPosition[0]};verticalLabelPosition=${labelPosition[1]};align=${labelPosition[2]};verticalAlign=${labelPosition[3]};`
    style += labelPositionStr
  }

  const _dropSuccessCb = (graph, evt, target, x, y) => {
    let cell = null
    if (type === 'edge') {
      cell = new mxCell('', new mxGeometry(0, 0, width, height), style)
      cell.geometry.setTerminalPoint(new mxPoint(0, height), true)
      cell.geometry.setTerminalPoint(new mxPoint(width, 0), false)
      cell.geometry.relative = true
      cell.edge = true
    } else if (type === 'curve') {
      cell = new mxCell('', new mxGeometry(0, 0, width, height), 'curved=1;endArrow=classic;html=1;')
      cell.geometry.setTerminalPoint(new mxPoint(0, height), true)
      cell.geometry.setTerminalPoint(new mxPoint(width, 0), false)
      cell.geometry.points = [new mxPoint(width, height), new mxPoint(0, 0)]
      cell.geometry.relative = true
      cell.edge = true
    } else if (type === 'image') {
      cell = new mxCell(value, new mxGeometry(0, 0, width, height), `shape=image;image=${src};${style}`)
      cell.vertex = true
    } else {
      cell = new mxCell(value, new mxGeometry(0, 0, width, height), style)
      cell.vertex = true
    }
    let cells = graph.importCells([cell], x, y, target)

    if (cells != null && cells.length > 0) {
      graph.scrollCellToVisible(cells[0])
      graph.setSelectionCells(cells)
    }
  }

  const dragElt = document.createElement('div')
  dragElt.style.border = 'dashed black 1px'
  dragElt.style.width = width + 'px'
  dragElt.style.height = height + 'px'

  mxUtils.makeDraggable(
    ele,
    _dropGraph,
    _dropSuccessCb,
    dragElt,
    null,
    null,
    null,
    true
  )
}
