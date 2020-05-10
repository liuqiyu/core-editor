/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2020-01-02 14:12:50
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-08 15:22:39
 */
import mxgraph from './mxgraph'

const {
  mxOutline
} = mxgraph

class OutLine {
  static init (graph, container) {
    /* eslint-disable no-new */
    new mxOutline(graph, container)
  }
}

export default OutLine
