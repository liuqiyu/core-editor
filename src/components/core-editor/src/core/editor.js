/*
 * @Description: editor
 * @Author: liuqiyu
 * @Date: 2019-12-04 15:00:15
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 11:42:32
 */
import mxgraph from './mxgraph'
import PopupMenu from './popupMenu'
import Graph from './graph'
import { defaultXml } from './constant'
import './shapes/shapes'

const {
  mxGraph,
  mxUtils,
  mxRubberband,
  mxCodec
} = mxgraph

export function Editor (editor, container) {
  this.editor = editor
  this.init(container)
}

Editor.prototype.init = function (container) {
  this.graph = new mxGraph(container)

  // 初始化样式
  const node = mxUtils.parseXml(defaultXml).documentElement
  if (node != null) {
    let dec = new mxCodec(node.ownerDocument)
    dec.decode(node, this.graph.getStylesheet())
  }

  PopupMenu.init(this.editor, this.graph, container)
  /* eslint-disable no-new */
  new Graph(this.graph)

  // 鼠标拖拽选中
  /* eslint-disable no-new */
  new mxRubberband(this.graph)
}

Editor.prototype.renderXml = function (value) {
  this.graph.model.beginUpdate()
  try {
    let doc = mxUtils.parseXml(value)
    let codec = new mxCodec(doc)
    codec.decode(doc.documentElement, this.graph.getModel())
  } finally {
    this.graph.model.endUpdate()
  }
}

Editor.prototype.readXml = function (filename) {
  let req = mxUtils.load(filename)
  let root = req.getDocumentElement()
  let dec = new mxCodec(root.ownerDocument)

  dec.decode(root, this.graph.getModel())
}
