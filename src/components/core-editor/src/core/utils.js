/*
 * @Description: utils 工具函数
 * @Author: liuqiyu
 * @Date: 2019-11-29 14:01:16
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-10 18:14:44
 */

/**
 * function：判断已选元件类型
 * @param {已选元件} cells
 * singleEdge: 只有1个 edge
 * singleVertex: 只有1个 vertex
 * multipleEdge: 多个 edge
 * multipleVertex: 多个 vertex
 * multipleAll: 多个 edge 和 vertex
 */
const typeofElement = cells => {
  try {
    if (cells.length === 1) {
      return cells[0].edge ? 'singleEdge' : 'singleVertex'
    } else {
      const multipleEdge = cells.every(cell => {
        return cell.edge
      })
      const multipleVertex = cells.every(cell => {
        return !cell.edge
      })
      if (multipleEdge && !multipleVertex) {
        return 'multipleEdge'
      } else if (!multipleEdge && multipleVertex) {
        return 'multipleVertex'
      } else if (!multipleEdge && !multipleVertex) {
        return 'multipleAll'
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export default {
  typeofElement
}
