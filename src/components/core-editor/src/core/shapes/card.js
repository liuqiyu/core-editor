import mxgraph from '../mxgraph'

const {
  mxUtils,
  mxActor,
  mxCellRenderer,
  mxPoint,
  mxConstants,
  mxRectangleShape
} = mxgraph

/**
 * Card shape
 * 卡片
 */
export function CardShape () {
  mxActor.call(this)
}
mxUtils.extend(CardShape, mxActor)
CardShape.prototype.size = 30
CardShape.prototype.redrawPath = function (c, x, y, w, h) {
  let s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))))
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  this.addPoints(c,
    [
      new mxPoint(s, 0),
      new mxPoint(w, 0),
      new mxPoint(w, h),
      new mxPoint(0, h),
      new mxPoint(0, s)
    ],
    this.isRounded, arcSize, true)
  c.end()
}
mxCellRenderer.registerShape('card', CardShape)

CardShape.prototype.constraints = mxRectangleShape.prototype.constraints
