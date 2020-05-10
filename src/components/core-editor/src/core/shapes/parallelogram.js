import mxgraph from './../mxgraph'

const {
  mxActor,
  mxUtils,
  mxPoint,
  mxConstants,
  mxCellRenderer,
  mxPerimeter,
  mxStyleRegistry,
  mxRectangleShape
} = mxgraph

/**
 * Parallelogram shape
 * 平行四边形
 */
function ParallelogramShape () {
  mxActor.call(this)
};
mxUtils.extend(ParallelogramShape, mxActor)
ParallelogramShape.prototype.size = 0.2
ParallelogramShape.prototype.redrawPath = function (c, x, y, w, h) {
  let dx = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  this.addPoints(c, [new mxPoint(0, h), new mxPoint(dx, 0), new mxPoint(w, 0), new mxPoint(w - dx, h)],
    this.isRounded, arcSize, true)
  c.end()
}
mxCellRenderer.registerShape('parallelogram', ParallelogramShape)

// Parallelogram Perimeter
mxPerimeter.ParallelogramPerimeter = function (bounds, vertex, next, orthogonal) {
  let size = ParallelogramShape.prototype.size

  if (vertex !== null) {
    size = mxUtils.getValue(vertex.style, 'size', size)
  }

  let x = bounds.x
  let y = bounds.y
  let w = bounds.width
  let h = bounds.height

  let direction = (vertex != null) ? mxUtils.getValue(
    vertex.style, mxConstants.STYLE_DIRECTION,
    mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST
  let vertical = direction === mxConstants.DIRECTION_NORTH ||
    direction === mxConstants.DIRECTION_SOUTH
  let points

  if (vertical) {
    let dy = h * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x, y), new mxPoint(x + w, y + dy),
      new mxPoint(x + w, y + h), new mxPoint(x, y + h - dy), new mxPoint(x, y)
    ]
  } else {
    let dx = w * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x + dx, y), new mxPoint(x + w, y),
      new mxPoint(x + w - dx, y + h), new mxPoint(x, y + h), new mxPoint(x + dx, y)
    ]
  }

  let cx = bounds.getCenterX()
  let cy = bounds.getCenterY()
  let p1 = new mxPoint(cx, cy)

  if (orthogonal) {
    if (next.x < x || next.x > x + w) {
      p1.y = next.y
    } else {
      p1.x = next.x
    }
  }

  return mxUtils.getPerimeterPoint(points, p1, next)
}

mxStyleRegistry.putValue('parallelogramPerimeter', mxPerimeter.ParallelogramPerimeter)

ParallelogramShape.prototype.constraints = mxRectangleShape.prototype.constraints
