import mxgraph from '../mxgraph'
import { createHandle, createArcHandle } from './shapes'

const {
  mxUtils,
  mxCellRenderer,
  mxCylinder,
  mxRectangle,
  mxPoint,
  mxConstants
} = mxgraph

/**
 * Cube Shape
 * 立方形
 */
export function CubeShape () {
  mxCylinder.call(this)
}
mxUtils.extend(CubeShape, mxCylinder)
CubeShape.prototype.size = 20
CubeShape.prototype.redrawPath = function (path, x, y, w, h, isForeground) {
  let s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))))

  if (isForeground) {
    path.moveTo(s, h)
    path.lineTo(s, s)
    path.lineTo(0, 0)
    path.moveTo(s, s)
    path.lineTo(w, s)
    path.end()
  } else {
    path.moveTo(0, 0)
    path.lineTo(w - s, 0)
    path.lineTo(w, s)
    path.lineTo(w, h)
    path.lineTo(s, h)
    path.lineTo(0, h - s)
    path.lineTo(0, 0)
    path.close()
    path.end()
  }
}
CubeShape.prototype.getLabelMargins = function (rect) {
  if (mxUtils.getValue(this.style, 'boundedLbl', false)) {
    let s = parseFloat(mxUtils.getValue(this.style, 'size', this.size)) * this.scale

    return new mxRectangle(s, s, 0, 0)
  }

  return null
}
mxCellRenderer.registerShape('cube', CubeShape)

// 立体形
export function createCubeHandleFunction (factor, defaultValue, allowArcHandle) {
  return function (state) {
    let handles = [createHandle(state, ['size'], function (bounds) {
      let size = Math.max(0, Math.min(bounds.width, Math.min(bounds.height, parseFloat(
        mxUtils.getValue(this.state.style, 'size', defaultValue))))) * factor

      return new mxPoint(bounds.x + size, bounds.y + size)
    }, function (bounds, pt) {
      this.state.style['size'] = Math.round(Math.max(0, Math.min(Math.min(bounds.width, pt.x - bounds.x),
        Math.min(bounds.height, pt.y - bounds.y))) / factor)
    })]
    if (allowArcHandle && mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false)) {
      handles.push(createArcHandle(state))
    }
    return handles
  }
}
