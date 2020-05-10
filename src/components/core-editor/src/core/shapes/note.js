import mxgraph from '../mxgraph'

const {
  mxUtils,
  mxCellRenderer,
  mxCylinder
} = mxgraph
/**
 * Note Shape, supports size style
 * 笔记
 */
export function NoteShape () {
  mxCylinder.call(this)
}
mxUtils.extend(NoteShape, mxCylinder)
NoteShape.prototype.size = 30
NoteShape.prototype.redrawPath = function (path, x, y, w, h, isForeground) {
  let s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))))

  if (isForeground) {
    path.moveTo(w - s, 0)
    path.lineTo(w - s, s)
    path.lineTo(w, s)
    path.end()
  } else {
    path.moveTo(0, 0)
    path.lineTo(w - s, 0)
    path.lineTo(w, s)
    path.lineTo(w, h)
    path.lineTo(0, h)
    path.lineTo(0, 0)
    path.close()
    path.end()
  }
}
mxCellRenderer.registerShape('note', NoteShape)
