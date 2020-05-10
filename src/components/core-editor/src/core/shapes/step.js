import mxgraph from '../mxgraph'

const {
  mxUtils,
  mxCellRenderer,
  mxPoint,
  mxConstants,
  mxActor,
  mxPerimeter,
  mxConnectionConstraint,
  mxStyleRegistry
} = mxgraph

/**
 * Step shape
 * 步骤条
 */
export function StepShape () {
  mxActor.call(this)
}

mxUtils.extend(StepShape, mxActor)

StepShape.prototype.size = 0.2
StepShape.prototype.fixedSize = 20
StepShape.prototype.redrawPath = function (c, x, y, w, h) {
  let fixed = mxUtils.getValue(this.style, 'fixedSize', '0') !== '0'
  let s = (fixed) ? Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize))))
    : w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  this.addPoints(c,
    [
      new mxPoint(0, 0),
      new mxPoint(w - s, 0),
      new mxPoint(w, h / 2),
      new mxPoint(w - s, h),
      new mxPoint(0, h),
      new mxPoint(s, h / 2)
    ], this.isRounded, arcSize, true)
  c.end()
}
mxCellRenderer.registerShape('step', StepShape)

// Step Perimeter
mxPerimeter.StepPerimeter = function (bounds, vertex, next, orthogonal) {
  let fixed = mxUtils.getValue(vertex.style, 'fixedSize', '0') !== '0'
  let size = (fixed) ? StepShape.prototype.fixedSize : StepShape.prototype.size

  if (vertex !== null) {
    size = mxUtils.getValue(vertex.style, 'size', size)
  }

  let x = bounds.x
  let y = bounds.y
  let w = bounds.width
  let h = bounds.height

  let cx = bounds.getCenterX()
  let cy = bounds.getCenterY()

  let direction = (vertex !== null) ? mxUtils.getValue(
    vertex.style, mxConstants.STYLE_DIRECTION,
    mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST
  let points

  if (direction === mxConstants.DIRECTION_EAST) {
    let dx = (fixed) ? Math.max(0, Math.min(w, size)) : w * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x, y),
      new mxPoint(x + w - dx, y),
      new mxPoint(x + w, cy),
      new mxPoint(x + w - dx, y + h),
      new mxPoint(x, y + h),
      new mxPoint(x + dx, cy),
      new mxPoint(x, y)
    ]
  } else if (direction === mxConstants.DIRECTION_WEST) {
    let dx = (fixed) ? Math.max(0, Math.min(w, size)) : w * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x + dx, y),
      new mxPoint(x + w, y),
      new mxPoint(x + w - dx, cy),
      new mxPoint(x + w, y + h),
      new mxPoint(x + dx, y + h),
      new mxPoint(x, cy), new mxPoint(x + dx, y)
    ]
  } else if (direction === mxConstants.DIRECTION_NORTH) {
    let dy = (fixed) ? Math.max(0, Math.min(h, size)) : h * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x, y + dy),
      new mxPoint(cx, y),
      new mxPoint(x + w, y + dy),
      new mxPoint(x + w, y + h),
      new mxPoint(cx, y + h - dy),
      new mxPoint(x, y + h),
      new mxPoint(x, y + dy)
    ]
  } else {
    let dy = (fixed) ? Math.max(0, Math.min(h, size)) : h * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x, y),
      new mxPoint(cx, y + dy),
      new mxPoint(x + w, y),
      new mxPoint(x + w, y + h - dy),
      new mxPoint(cx, y + h),
      new mxPoint(x, y + h - dy),
      new mxPoint(x, y)
    ]
  }

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

mxStyleRegistry.putValue('stepPerimeter', mxPerimeter.StepPerimeter)

StepShape.prototype.constraints = [
  new mxConnectionConstraint(new mxPoint(0.25, 0), true),
  new mxConnectionConstraint(new mxPoint(0.5, 0), true),
  new mxConnectionConstraint(new mxPoint(0.75, 0), true),
  new mxConnectionConstraint(new mxPoint(0.25, 1), true),
  new mxConnectionConstraint(new mxPoint(0.5, 1), true),
  new mxConnectionConstraint(new mxPoint(0.75, 1), true),
  new mxConnectionConstraint(new mxPoint(0, 0.25), true),
  new mxConnectionConstraint(new mxPoint(0, 0.5), true),
  new mxConnectionConstraint(new mxPoint(0, 0.75), true),
  new mxConnectionConstraint(new mxPoint(1, 0.25), true),
  new mxConnectionConstraint(new mxPoint(1, 0.5), true),
  new mxConnectionConstraint(new mxPoint(1, 0.75), true)
]
