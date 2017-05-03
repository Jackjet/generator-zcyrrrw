const config = require('../config')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')
const opn = require('opn')
const debug = require('debug')('app:server')

debug('设置server启动配置')
let port = process.env.PORT || config.dev.port
let autoOpenBrowser = !!config.dev.autoOpenBrowser

let proxyTable = config.dev.proxyTable

let app = express()
debug('编译webpack配置')
let compiler = webpack(webpackConfig)
debug('webpack编译完成')
debug('将编译流通过webpack-dev-middleware')
let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    chunks : false,
    chunkModules : false,
    colors : true
  }
})


debug('将编译流通过webpack-hot-middleware')
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})


debug('添加html修改自动刷新钩子')
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})


debug('设置代理信息')
Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context]
  if(typeof options === 'string'){
    options = {
      target: options
    }
  }

  app.use(proxyMiddleware(options.filter || context, options))
})


debug('添加history-fallback中间件')
app.use(require('connect-history-api-fallback')())
debug('添加webpack-dev-middleware中间件')
app.use(devMiddleware)
debug('添加webpack-hot-middleware中间件')
app.use(hotMiddleware)
debug('设置静态文件托管目录')
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

app.use(staticPath, express.static('public'))

let uri = 'http://localhost:' + port

debug('> Starting dev server...')
debug('设置webpack-dev-middleware中间件编译后的回调')
devMiddleware.waitUntilValid(() => {
  debug('> Listening at ' + uri + '\n')

  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
debug(`server开始监听端口${port}`)
let server = app.listen(port)