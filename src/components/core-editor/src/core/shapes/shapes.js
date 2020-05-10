import mxgraph from './../mxgraph'
import './parallelogram' // 平行四边形
import { HexagonShape } from './hexagon' // 六边形
import { DocumentShape } from './document' // 六边形
import { StepShape } from './step' // 步骤条
import { TrapezoidShape } from './trapezoid' // 步骤条
import { CardShape } from './card' // 立方体
import { CubeShape, createCubeHandleFunction } from './cube' // 立方体
import { NoteShape } from './note' // 立方体
import { CalloutShape } from './callout' // 立方体

const {
  mxUtils,
  mxPoint,
  mxConstants,
  mxCellRenderer,
  mxHandle,
  mxVertexHandler,
  mxStencilRegistry,
  mxEdgeHandler,
  mxEvent
} = mxgraph

/**
 * 拖动位置
 */
export function createHandle (state, keys, getPositionFn, setPositionFn, ignoreGrid, redrawEdges) {
  let handle = new mxHandle(state, null, mxVertexHandler.prototype.secondaryHandleImage)

  handle.execute = function () {
    for (let i = 0; i < keys.length; i++) {
      this.copyStyle(keys[i])
    }
  }
  handle.getPosition = getPositionFn
  handle.setPosition = setPositionFn
  handle.ignoreGrid = (ignoreGrid != null) ? ignoreGrid : true
  // Overridden to update connected edges
  if (redrawEdges) {
    let positionChanged = handle.positionChanged

    handle.positionChanged = function () {
      positionChanged.apply(this, arguments)

      // Redraws connected edges TODO: Include child edges
      state.view.invalidate(this.state.cell)
      state.view.validate()
    }
  }
  return handle
}

export function createArcHandle (state, yOffset) {
  return createHandle(state, [mxConstants.STYLE_ARCSIZE], function (bounds) {
    let tmp = (yOffset !== null) ? yOffset : bounds.height / 8

    if (mxUtils.getValue(state.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0) === '1') {
      let arcSize = mxUtils.getValue(state.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
      alert(11)
      return new mxPoint(bounds.x + bounds.width - Math.min(bounds.width / 2, arcSize), bounds.y + tmp)
    } else {
      let arcSize = Math.max(0, parseFloat(mxUtils.getValue(state.style,
        mxConstants.STYLE_ARCSIZE, mxConstants.RECTANGLE_ROUNDING_FACTOR * 100))) / 100
      return new mxPoint(bounds.x + bounds.width - Math.min(Math.max(bounds.width / 2, bounds.height / 2),
        Math.min(bounds.width, bounds.height) * arcSize), bounds.y + tmp)
    }
  }, function (bounds, pt, me) {
    alert(3)
    if (mxUtils.getValue(state.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0) === '1') {
      alert(33)
      this.state.style[mxConstants.STYLE_ARCSIZE] = Math.round(Math.max(0, Math.min(bounds.width,
        (bounds.x + bounds.width - pt.x) * 2)))
    } else {
      alert(44)
      let f = Math.min(50, Math.max(0, (bounds.width - pt.x + bounds.x) * 100 /
        Math.min(bounds.width, bounds.height)))
      this.state.style[mxConstants.STYLE_ARCSIZE] = Math.round(f)
    }
  })
}

function createArcHandleFunction () {
  return function (state) {
    let handles = []
    if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false)) {
      handles.push(createArcHandle(state))
    }

    return handles
  }
}

function createTrapezoidHandleFunction (max) {
  return function (state) {
    let handles = [createHandle(state, ['size'], function (bounds) {
      let size = Math.max(0, Math.min(max, parseFloat(mxUtils.getValue(this.state.style, 'size', TrapezoidShape.prototype.size))))

      return new mxPoint(bounds.x + size * bounds.width * 0.75, bounds.y + bounds.height / 4)
    }, function (bounds, pt) {
      this.state.style['size'] = Math.max(0, Math.min(max, (pt.x - bounds.x) / (bounds.width * 0.75)))
    }, null, true)]

    if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false)) {
      handles.push(createArcHandle(state))
    }

    return handles
  }
}

// 六边形
function createDisplayHandleFunction (defaultValue, allowArcHandle, max, redrawEdges, fixedDefaultValue) {
  max = (max !== null) ? max : 1

  return function (state) {
    let handles = [createHandle(state, ['size'], function (bounds) {
      let fixed = (fixedDefaultValue !== null) ? mxUtils.getValue(this.state.style, 'fixedSize', '0') !== '0' : null
      let size = parseFloat(mxUtils.getValue(this.state.style, 'size', (fixed) ? fixedDefaultValue : defaultValue))

      return new mxPoint(bounds.x + Math.max(0, Math.min(bounds.width, size * ((fixed) ? 1 : bounds.width))), bounds.getCenterY())
    }, function (bounds, pt, me) {
      let fixed = (fixedDefaultValue !== null) ? mxUtils.getValue(this.state.style, 'fixedSize', '0') !== '0' : null
      let size = (fixed) ? (pt.x - bounds.x) : Math.max(0, Math.min(max, (pt.x - bounds.x) / bounds.width))

      if (fixed && !mxEvent.isAltDown(me.getEvent())) {
        size = state.view.graph.snap(size)
      }

      this.state.style['size'] = size
    }, null, redrawEdges)]

    if (allowArcHandle && mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false)) {
      handles.push(createArcHandle(state))
    }

    return handles
  }
}

let handleFactory = {
  'label': createArcHandleFunction(),
  'ext': createArcHandleFunction(),
  'rectangle': createArcHandleFunction(),
  'note': function (state) {
    return [createHandle(state, ['size'], function (bounds) {
      let size = Math.max(0, Math.min(bounds.width, Math.min(bounds.height, parseFloat(
        mxUtils.getValue(this.state.style, 'size', NoteShape.prototype.size)))))

      return new mxPoint(bounds.x + bounds.width - size, bounds.y + size)
    }, function (bounds, pt) {
      this.state.style['size'] = Math.round(Math.max(0, Math.min(Math.min(bounds.width, bounds.x + bounds.width - pt.x),
        Math.min(bounds.height, pt.y - bounds.y))))
    })]
  },
  'callout': function (state) {
    let handles = [createHandle(state, ['size', 'position'], function (bounds) {
      let size = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'size', CalloutShape.prototype.size)))
      let position = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', CalloutShape.prototype.position)))
      // let base = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'base', CalloutShape.prototype.base)))

      return new mxPoint(bounds.x + position * bounds.width, bounds.y + bounds.height - size)
    }, function (bounds, pt) {
      // let base = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'base', CalloutShape.prototype.base)))
      this.state.style['size'] = Math.round(Math.max(0, Math.min(bounds.height, bounds.y + bounds.height - pt.y)))
      this.state.style['position'] = Math.round(Math.max(0, Math.min(1, (pt.x - bounds.x) / bounds.width)) * 100) / 100
    }), createHandle(state, ['position2'], function (bounds) {
      let position2 = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position2', CalloutShape.prototype.position2)))

      return new mxPoint(bounds.x + position2 * bounds.width, bounds.y + bounds.height)
    }, function (bounds, pt) {
      this.state.style['position2'] = Math.round(Math.max(0, Math.min(1, (pt.x - bounds.x) / bounds.width)) * 100) / 100
    }), createHandle(state, ['base'], function (bounds) {
      let size = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'size', CalloutShape.prototype.size)))
      let position = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', CalloutShape.prototype.position)))
      let base = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'base', CalloutShape.prototype.base)))

      return new mxPoint(bounds.x + Math.min(bounds.width, position * bounds.width + base), bounds.y + bounds.height - size)
    }, function (bounds, pt) {
      let position = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', CalloutShape.prototype.position)))

      this.state.style['base'] = Math.round(Math.max(0, Math.min(bounds.width, pt.x - bounds.x - position * bounds.width)))
    })]

    if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false)) {
      handles.push(createArcHandle(state))
    }

    return handles
  },
  // 立体形
  'cube': createCubeHandleFunction(1, CubeShape.prototype.size, false),
  // 平行四边形
  'parallelogram': createTrapezoidHandleFunction(1),
  // 六边形
  'hexagon': createDisplayHandleFunction(HexagonShape.prototype.size, true, 0.5, true),
  // 卡片
  'card': createCubeHandleFunction(0.5, CardShape.prototype.size, true),
  // 梯形
  'trapezoid': createTrapezoidHandleFunction(0.5),
  // 步骤条
  'step': createDisplayHandleFunction(StepShape.prototype.size, true, null, true, StepShape.prototype.fixedSize),
  'document': function (state) {
    return [createHandle(state, ['size'], function (bounds) {
      let size = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'size', DocumentShape.prototype.size))))

      return new mxPoint(bounds.x + 3 * bounds.width / 4, bounds.y + (1 - size) * bounds.height)
    }, function (bounds, pt) {
      this.state.style['size'] = Math.max(0, Math.min(1, (bounds.y + bounds.height - pt.y) / bounds.height))
    })]
  }
}

mxVertexHandler.prototype.createCustomHandles = function () {
  // Not rotatable means locked
  if (this.state.view.graph.getSelectionCount() === 1) {
    if (this.graph.isCellRotatable(this.state.cell)) {
      console.log(this.state.cell)
      let name = this.state.style['shape']

      if (mxCellRenderer.defaultShapes[name] == null &&
        mxStencilRegistry.getStencil(name) == null) {
        name = mxConstants.SHAPE_RECTANGLE
      }

      let fn = handleFactory[name]

      if ((fn === null || fn === undefined) && this.state.shape !== null && this.state.shape.isRoundable()) {
        fn = handleFactory[mxConstants.SHAPE_RECTANGLE]
      }

      if (fn !== null && fn !== undefined) {
        return fn(this.state)
      }
    }
  }
  return null
}

mxEdgeHandler.prototype.createCustomHandles = function () {
  if (this.state.view.graph.getSelectionCount() === 1) {
    let name = this.state.style['shape']

    if (mxCellRenderer.defaultShapes[name] === null &&
      mxStencilRegistry.getStencil(name) === null) {
      name = mxConstants.SHAPE_CONNECTOR
    }

    let fn = handleFactory[name]

    if (fn !== null && fn !== undefined) {
      return fn(this.state)
    }
  }
  return null
}
