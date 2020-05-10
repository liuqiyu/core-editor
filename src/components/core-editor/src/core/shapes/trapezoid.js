import mxgraph from '../mxgraph'

const {
  mxUtils,
  mxCellRenderer,
  mxActor,
  mxPoint,
  mxConstants,
  mxPerimeter,
  mxRectangleShape,
  mxStyleRegistry
} = mxgraph

/**
 * Trapezoid shape
 * 梯形
 */
export function TrapezoidShape () {
  mxActor.call(this)
}

mxUtils.extend(TrapezoidShape, mxActor)

TrapezoidShape.prototype.size = 0.2
TrapezoidShape.prototype.redrawPath = function (c, x, y, w, h) {
  let dx = w * Math.max(0, Math.min(0.5, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  this.addPoints(c,
    [
      new mxPoint(0, h),
      new mxPoint(dx, 0),
      new mxPoint(w - dx, 0),
      new mxPoint(w, h)
    ],
    this.isRounded, arcSize, true)
}
mxCellRenderer.registerShape('trapezoid', TrapezoidShape)

// Trapezoid Perimeter
mxPerimeter.TrapezoidPerimeter = function (bounds, vertex, next, orthogonal) {
  let size = TrapezoidShape.prototype.size

  if (vertex != null) {
    size = mxUtils.getValue(vertex.style, 'size', size)
  }

  let x = bounds.x
  let y = bounds.y
  let w = bounds.width
  let h = bounds.height

  let direction = (vertex != null) ? mxUtils.getValue(
    vertex.style, mxConstants.STYLE_DIRECTION,
    mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST
  let points

  if (direction === mxConstants.DIRECTION_EAST) {
    let dx = w * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x + dx, y),
      new mxPoint(x + w - dx, y),
      new mxPoint(x + w, y + h),
      new mxPoint(x, y + h),
      new mxPoint(x + dx, y)
    ]
  } else if (direction === mxConstants.DIRECTION_WEST) {
    let dx = w * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x, y),
      new mxPoint(x + w, y),
      new mxPoint(x + w - dx, y + h),
      new mxPoint(x + dx, y + h),
      new mxPoint(x, y)
    ]
  } else if (direction === mxConstants.DIRECTION_NORTH) {
    let dy = h * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x, y + dy),
      new mxPoint(x + w, y),
      new mxPoint(x + w, y + h),
      new mxPoint(x, y + h - dy),
      new mxPoint(x, y + dy)
    ]
  } else {
    let dy = h * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x, y),
      new mxPoint(x + w, y + dy),
      new mxPoint(x + w, y + h - dy),
      new mxPoint(x, y + h),
      new mxPoint(x, y)
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

mxStyleRegistry.putValue('trapezoidPerimeter', mxPerimeter.TrapezoidPerimeter)

TrapezoidShape.prototype.constraints = mxRectangleShape.prototype.constraints
