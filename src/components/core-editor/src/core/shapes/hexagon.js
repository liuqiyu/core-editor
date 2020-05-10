import mxgraph from './../mxgraph'

const {
  mxActor,
  mxUtils,
  mxPoint,
  mxConstants,
  mxCellRenderer,
  mxPerimeter,
  mxStyleRegistry,
  mxHexagon,
  mxConnectionConstraint
} = mxgraph

/**
 *  Hexagon shape
 *  六角形
 */
export function HexagonShape () {
  mxActor.call(this)
}

mxUtils.extend(HexagonShape, mxHexagon)

HexagonShape.prototype.size = 0.25

HexagonShape.prototype.redrawPath = function (c, x, y, w, h) {
  let s = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  this.addPoints(c,
    [
      new mxPoint(s, 0),
      new mxPoint(w - s, 0),
      new mxPoint(w, 0.5 * h),
      new mxPoint(w - s, h),
      new mxPoint(s, h), new mxPoint(0, 0.5 * h)
    ], this.isRounded, arcSize, true)
}
mxCellRenderer.registerShape('hexagon', HexagonShape)

// Hexagon Perimeter 2 (keep existing one)
mxPerimeter.HexagonPerimeter2 = function (bounds, vertex, next, orthogonal) {
  let size = HexagonShape.prototype.size
  console.log(vertex)
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
  let vertical = direction === mxConstants.DIRECTION_NORTH ||
    direction === mxConstants.DIRECTION_SOUTH
  let points

  if (vertical) {
    let dy = h * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(cx, y),
      new mxPoint(x + w, y + dy),
      new mxPoint(x + w, y + h - dy),
      new mxPoint(cx, y + h), new mxPoint(x, y + h - dy),
      new mxPoint(x, y + dy), new mxPoint(cx, y)
    ]
  } else {
    let dx = w * Math.max(0, Math.min(1, size))
    points = [
      new mxPoint(x + dx, y), new mxPoint(x + w - dx, y),
      new mxPoint(x + w, cy),
      new mxPoint(x + w - dx, y + h),
      new mxPoint(x + dx, y + h),
      new mxPoint(x, cy),
      new mxPoint(x + dx, y)]
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

mxStyleRegistry.putValue('hexagonPerimeter2', mxPerimeter.HexagonPerimeter2)

// 六角形
mxHexagon.prototype.constraints = [
  new mxConnectionConstraint(new mxPoint(0.375, 0), true),
  new mxConnectionConstraint(new mxPoint(0.5, 0), true),
  new mxConnectionConstraint(new mxPoint(0.625, 0), true),
  new mxConnectionConstraint(new mxPoint(0, 0.25), true),
  new mxConnectionConstraint(new mxPoint(0, 0.5), true),
  new mxConnectionConstraint(new mxPoint(0, 0.75), true),
  new mxConnectionConstraint(new mxPoint(1, 0.25), true),
  new mxConnectionConstraint(new mxPoint(1, 0.5), true),
  new mxConnectionConstraint(new mxPoint(1, 0.75), true),
  new mxConnectionConstraint(new mxPoint(0.375, 1), true),
  new mxConnectionConstraint(new mxPoint(0.5, 1), true),
  new mxConnectionConstraint(new mxPoint(0.625, 1), true)
]
