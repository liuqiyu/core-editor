/*
 * @Description: webpack 配置
 * @Author: liuqiyu
 * @Date: 2019-10-09 14:47:52
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-08 20:10:11
 */
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = '拓扑编辑器' // page title

const port = 5858 // dev port

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  productionSourceMap: false, // 关闭map配置
  devServer: {
    port, // 代理端口
    open: true, // 是否自动打开浏览器
    // 让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        static: resolve('public/static')
      }
    },
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 100000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 100000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    },
    externals: {
      'CoreEditor': 'CoreEditor'
    }
  },
  // 删除moment除zh-cn中文包外的其它语言包，无需在代码中手动引入zh-cn语言包。
  chainWebpack: config => {
    // 打包分析
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))

    return config
  }
}
