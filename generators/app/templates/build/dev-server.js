const config = require('../config')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')
const opn = require('opn')

let port = process.env.PORT || config.dev.port
let autoOpenBrowser = !!config.dev.autoOpenBrowser

let proxyTable = config.dev.proxyTable

let app = express()

let compiler = webpack(webpackConfig)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context]
  if(typeof options === 'string'){
    options = {
      target: options
    }
  }

  app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
console.log(staticPath)
app.use(express.static('./public'))

let uri = 'http://localhost:' + port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')

  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})

let server = app.listen(port)