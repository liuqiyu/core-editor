<template>
  <div class="graph-sidebar">
    <header class="title">元件库</header>
    <div class="elements">
      <el-collapse style="width: 100%"
                   v-model="activeNames">
        <el-collapse-item v-for="(item, index) in sideList"
                          :title="item.title || ''"
                          :name="index"
                          :key="index">
          <div class="collapse-wrapper">
            <div class="collapse-item drap"
                 :data-width="cell.width"
                 :data-height="cell.height"
                 :data-src="cell.src"
                 :data-style="cell.style"
                 :data-value="cell.label"
                 :data-type="cell.type"
                 :data-position="cell.position"
                 v-for="(cell, key) in item.children"
                 :key="key">
              <img ref="ele"
                   :src="cell.src"
                   :alt="cell.name"
                   class="img">
              <p class="name">{{cell.name}}</p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['coreEditor'],
  watch: {
    coreEditor (val) {
      if (val) {
        this.createDragSource()
      }
    }
  },
  data () {
    return {
      activeNames: [0],
      sideList: [
        {
          title: '基础元件',
          children: [
            {
              name: '矩形',
              src: require('static/images/sidebar/24gl-rectangle.svg'),
              width: 120,
              height: 60,
              style: 'rounded=0;whiteSpace=wrap;html=1;'
            },
            {
              name: '圆角矩形',
              src: require('static/images/sidebar/rectangle.svg'),
              width: 120,
              height: 60,
              style: 'rounded=1;whiteSpace=wrap;html=1;'
            },
            {
              name: '文本框',
              src: require('static/images/sidebar/text.svg'),
              width: 40,
              height: 20,
              style: 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;',
              label: '文本框'
            },
            {
              name: '图片',
              src: require('static/images/sidebar/image.svg'),
              width: 48,
              height: 48,
              type: 'image'
            },
            {
              name: '圆形',
              src: require('static/images/sidebar/ellipse.svg'),
              width: 80,
              height: 80,
              style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;'
            },
            {
              name: '椭圆',
              src: require('static/images/sidebar/oval.svg'),
              width: 120,
              height: 80,
              style: 'ellipse;whiteSpace=wrap;html=1;'
            },
            {
              name: '菱形',
              src: require('static/images/sidebar/diamond.svg'),
              width: 80,
              height: 80,
              style: 'rhombus;whiteSpace=wrap;html=1'
            },
            {
              name: '平行四边形',
              src: require('./images/sidebar/parallelogram.svg'),
              width: 120,
              height: 60,
              style: 'shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;'
            },
            {
              name: '六角形',
              src: require('./images/sidebar/hexagon.svg'),
              width: 120,
              height: 80,
              style: 'shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;'
            },
            {
              name: '三角形',
              src: require('./images/sidebar/triangle.svg'),
              width: 80,
              height: 80,
              style: 'triangle;whiteSpace=wrap;html=1;'
            },
            {
              name: '圆柱形',
              src: require('./images/sidebar/cylinder.svg'),
              width: 60,
              height: 80,
              style: 'shape=cylinder;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;'
            },
            {
              name: '云',
              src: require('./images/sidebar/cloud.svg'),
              width: 120,
              height: 60,
              style: 'ellipse;shape=cloud;whiteSpace=wrap;html=1;'
            },
            {
              name: '文档',
              src: require('./images/sidebar/document.svg'),
              width: 120,
              height: 80,
              style: 'shape=document;whiteSpace=wrap;html=1;boundedLbl=1;'
            },
            {
              name: '立方体',
              src: require('./images/sidebar/cube.svg'),
              width: 120,
              height: 80,
              style: 'shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;'
            },
            {
              name: '步骤条',
              src: require('./images/sidebar/step.svg'),
              width: 120,
              height: 80,
              style: 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;'
            },
            {
              name: '梯形',
              src: require('./images/sidebar/trapezoid.svg'),
              width: 120,
              height: 60,
              style: 'shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1'
            },
            {
              name: '笔记',
              src: require('./images/sidebar/note.svg'),
              width: 80,
              height: 100,
              style: 'shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;'
            },
            {
              name: '标注',
              src: require('./images/sidebar/callout.svg'),
              width: 120,
              height: 80,
              style: 'shape=callout;whiteSpace=wrap;html=1;perimeter=calloutPerimeter;'
            },
            {
              name: '卡片',
              src: require('./images/sidebar/card.svg'),
              width: 80,
              height: 100,
              style: 'shape=card;whiteSpace=wrap;html=1;'
            },
            {
              name: '直线',
              src: require('static/images/sidebar/line.svg'),
              width: 50,
              height: 50,
              type: 'edge',
              style: 'endArrow=none;html=1;'
            },
            {
              name: '虚线',
              src: require('static/images/sidebar/dashed-line.svg'),
              width: 50,
              height: 50,
              type: 'edge',
              style: 'endArrow=none;dashed=1;html=1;'
            },
            {
              name: '双向箭头',
              src: require('static/images/sidebar/bidirectional-arrow.svg'),
              width: 50,
              height: 50,
              type: 'edge',
              style: 'endArrow=classic;startArrow=classic;html=1;'
            },
            {
              name: '单向箭头',
              src: require('static/images/sidebar/directional-connector.svg'),
              width: 50,
              height: 50,
              type: 'edge',
              style: 'endArrow=none;dashed=1;html=1;'
            },
            {
              name: 'curve',
              src: require('static/images/sidebar/curve.svg'),
              width: 50,
              height: 50,
              type: 'curve',
              style: 'curved=1;endArrow=classic;html=1;'
            }
          ]
        },
        {
          title: '办公元件',
          children: [
            {
              name: '地球',
              src: 'static/images/work/Earth_globe_128x128.png',
              width: 60,
              height: 60,
              type: 'image',
              position: ['left', 'middle', 'right', 'middle'],
              label: '地球'
            },
            {
              name: '邮箱',
              src: require('static/images/work/Email_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '文件夹',
              src: require('static/images/work/Empty_Folder_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '文件夹2',
              src: require('static/images/work/Full_Folder_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '齿轮',
              src: require('static/images/work/Gear_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '图表',
              src: require('static/images/work/Graph_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: 'iMac',
              src: require('static/images/work/iMac_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: 'iPad',
              src: require('static/images/work/iPad_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '笔记本',
              src: require('static/images/work/Laptop_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '钟表',
              src: require('static/images/work/Lock_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: 'MacBook',
              src: require('static/images/work/MacBook_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '主机',
              src: require('static/images/work/Monitor_Tower_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '打印机',
              src: require('static/images/work/Printer_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            }
          ]
        },
        {
          title: '设备元件',
          children: [
            {
              name: 'ATS柜',
              src: require('static/images/equipment/ATS_S.svg'),
              width: 60,
              height: 60,
              type: 'image',
              label: 'ATS柜'
            },
            {
              name: '变压器',
              src: require('static/images/equipment/byq_S.svg'),
              width: 60,
              height: 60,
              type: 'image',
              label: '变压器'
            },
            {
              name: '低压出线柜',
              src: require('static/images/equipment/dycxg_S.svg'),
              width: 60,
              height: 60,
              type: 'image',
              label: '低压出线柜'
            },
            {
              name: '低压进线柜',
              src: require('static/images/equipment/dyjxg_S.svg'),
              width: 60,
              height: 60,
              type: 'image',
              label: '低压进线柜'
            },
            {
              name: '列头柜',
              src: require('static/images/equipment/ltg_S.svg'),
              width: 60,
              height: 60,
              type: 'image',
              label: '列头柜'
            },
            {
              name: '微模块',
              src: require('static/images/equipment/wmk_S.svg'),
              width: 60,
              height: 60,
              type: 'image',
              label: '微模块'
            },
            {
              name: '油机',
              src: require('static/images/equipment/yj_S.svg'),
              width: 60,
              height: 60,
              type: 'image',
              label: '油机'
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 对象转化为字符串
    setString (style) {
      if (!style) {
        return ''
      }
      let str = ''
      Object.keys(style).forEach(item => {
        console.log(item)
        str += `${item}=${style[item]};`
      })
      return str
    },
    createDragSource () {
      const ele = document.querySelectorAll('.drap')
      ele.forEach(item => {
        const dataset = item.dataset
        let src = dataset.src
        const width = Number(dataset.width)
        const height = Number(dataset.height)
        const style = dataset.style
        const value = dataset.value || ''
        const type = dataset.type
        const position = dataset.position

        this.coreEditor.sidebar.createDragSource(item, type, width, height, value, style, src, position)
      })
    },
    getUrlBase64 (url, ext, callback) {
      let canvas = document.createElement('canvas') // 创建canvas DOM元素
      let ctx = canvas.getContext('2d')
      let img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = url
      img.onload = function () {
        canvas.height = 60 // 指定画板的高度,自定义
        canvas.width = 85 // 指定画板的宽度，自定义
        ctx.drawImage(img, 0, 0, 60, 85) // 参数可自定义
        let dataURL = canvas.toDataURL('image/' + ext)
        callback.call(this, dataURL) // 回掉函数获取Base64编码
        canvas = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.graph-sidebar {
  flex: none;
  height: 100%;
  background: #fff;
  border-right: 1px solid #e1e1e1;
  width: 251px;
  display: flex;
  flex-direction: column;
  .title {
    flex: none;
    height: 34px;
    background: #f6f6f6;
    line-height: 34px;
    text-indent: 12px;
    font-size: 14px;
    color: #333333;
  }
  .elements {
    display: flex;
    flex: 1;
    height: 100%;
    flex-wrap: wrap;
    overflow-y: auto;
  }
  .collapse-wrapper {
    width: 100%;
    // padding: 0 5px;
    display: flex;
    flex-wrap: wrap;
    // 不可选中
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .collapse-item {
      width: 60px;
      // height: 60px;
      text-align: center;
      cursor: move;
      border: 1px solid #fff;
      border-radius: 4px;
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.4);
      }
      img {
        margin-top: 4px;
        width: 36px;
        height: 36px;
        vertical-align: middle;
      }
      .name {
        text-align: center;
        margin-top: 3px;
        font-size: 12px;
      }
    }
  }
  ::v-deep .el-collapse-item {
    .el-collapse-item__header {
      text-indent: 14px;
    }
  }
}
</style>
