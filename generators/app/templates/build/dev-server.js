const config = require('../config')
const http = require('http')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')
const express = require('express')
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()
const opn = require('opn')
const debug = require('debug')('app:server')

const Promise = require('bluebird')
const request = require('request')
Promise.promisifyAll(request)

//设置默认用户名密码
const authorName = '339900864'
const authorPassword = '123456'

const authStr = new Buffer('zcyadmin:vK6olR5IzoceCP8u').toString('base64')
const baseAuthStr = 'Basic ' + authStr // 基础接口对接的校验参数
// 调用接口时的校验参数
let authorizationValue = ''

function jsonParse(data) {
  try {
    return JSON.parse(data)
  } catch (e) {
    return {}
  }
}

function getUaaHostpath() {
  return 'http://login.dev.cai-inc.com'
}

function getMiddlePath() {
  return 'http://middle.dev.cai-inc.com'
}

function getOauthUri () {
  return getUaaHostpath() + '/oauth/token?grant_type=password&username=' + authorName + '&password=' + authorPassword
}

function getAuthorization () {
  // 已经存在，直接返回
  if (authorizationValue) {
    return Promise.resolve(authorizationValue)
  }

  const oauthUri = getOauthUri()
  return request.postAsync({
    uri: oauthUri,
    headers: {
      Authorization: baseAuthStr
    }
  })
  .then(function (res) {
    
    const data = jsonParse(res.body)
    const tokenType = data.token_type
    
    const accessToken = data.access_token
    authorizationValue = tokenType + ' ' + accessToken

    console.log(authorizationValue);
  })
  .then(function () {
    // 一小时执行
    return authorizationValue
  })
}
getAuthorization()

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

// proxy.on('proxyReq', function (proxyReq, req, res, options) {
//   proxyReq.setHeader('Authorization', authorizationValue)
//   console.log(res)
// })

app.all('/*', (req, res, next) => {
  console.info('请求', req.path)
  next()
})





Object.keys(proxyTable).forEach((context) => {
  // let options = proxyTable[context]
  // if(typeof options === 'string'){
  //   options = {
  //     target: options
  //   }
  // }

  app.all(context, (req, res) => {
    let options = {
      url: getMiddlePath() + req.path,
      headers: {
        "Authorization": authorizationValue
      }
    }
    request(options, function(error, response, body){
      if(!/^2/.test(response.statusCode)){
        res.send(jsonParse(response.body))
      }else{
        let fs = require('../mockData')
        
        let data = fs[req.path]
        if(data){
          res.send(data());
        }else{
          res.send()
        }
      }
    })
  })
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