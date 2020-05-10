import mxgraph from '../mxgraph'

const {
  mxUtils,
  mxActor,
  mxHexagon,
  mxPerimeter,
  mxStyleRegistry,
  mxCellRenderer,
  mxRectangle,
  mxPoint,
  mxConstants
} = mxgraph

/**
 * Callout shape
 * 标注
 */
export function CalloutShape () {
  mxActor.call(this)
}
mxUtils.extend(CalloutShape, mxHexagon)
CalloutShape.prototype.size = 30
CalloutShape.prototype.position = 0.5
CalloutShape.prototype.position2 = 0.5
CalloutShape.prototype.base = 20
CalloutShape.prototype.getLabelMargins = function () {
  return new mxRectangle(0, 0, 0, parseFloat(mxUtils.getValue(
    this.style, 'size', this.size)) * this.scale)
}
CalloutShape.prototype.redrawPath = function (c, x, y, w, h) {
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  let s = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
  let dx = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position', this.position))))
  let dx2 = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position2', this.position2))))
  let base = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'base', this.base))))

  this.addPoints(c,
    [
      new mxPoint(0, 0),
      new mxPoint(w, 0),
      new mxPoint(w, h - s),
      new mxPoint(Math.min(w, dx + base), h - s),
      new mxPoint(dx2, h),
      new mxPoint(Math.max(0, dx), h - s),
      new mxPoint(0, h - s)
    ],
    this.isRounded, arcSize, true, [4])
}
mxCellRenderer.registerShape('callout', CalloutShape)
// Callout Perimeter
mxPerimeter.CalloutPerimeter = function (bounds, vertex, next, orthogonal) {
  return mxPerimeter.RectanglePerimeter(mxUtils.getDirectedBounds(bounds, new mxRectangle(0, 0, 0, Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(vertex.style, 'size', CalloutShape.prototype.size)) * vertex.view.scale))), vertex.style), vertex, next, orthogonal)
}

mxStyleRegistry.putValue('calloutPerimeter', mxPerimeter.CalloutPerimeter)
