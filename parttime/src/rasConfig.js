const path = require('path')
const resolve = function (dir) {
  return path.resolve(__dirname, dir)
}
module.exports = {
  // 入口js
  appIndexJs: 'src/common/core/index.js',
  // 模块名称
  alias: {
    src: resolve('.'),
    api: resolve('api'),
    utils: resolve('common/utils'),
    pages: resolve('pages'),
    config: resolve('config'),
    common: resolve('common'),
    core: resolve('common/core'),
    styles: resolve('common/styles'),
    images: resolve('common/images'),
    components: resolve('components'),
    storeKit: resolve('common/core/store/storeKit')
  },
  devHost: 'localhost',
  devPort: 3332,
  // 代理配置
  proxyTable: {
    '/api': {
      target: 'http://localhost:3333',
      changeOrigin: true,
      pathRewrite: {}
    },
    '/other': {
      target: 'http://localhost:10086',
      changeOrigin: true,
      pathRewrite: {}
    }
  },
  // 开发环境dll文件列表，生成环境commonChunk文件列表
  dll: [
    'axios',
    'react',
    'react-dom',
    'react-router-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-loadable'
  ]
}
