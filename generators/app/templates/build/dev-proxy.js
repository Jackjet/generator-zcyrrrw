const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()
const proxyRespJson = require('node-http-proxy-json')

const Promise = require('bluebird')
const request = require('request')
Promise.promisifyAll(request)

const _ = require('lodash')

const debug = require('debug')('app:proxy')
const config = require('../config')
const proxyOptions = config.dev.proxyOptions

const mockData = require('../mockData')

// 基础接口对接的校验参数
const baseAuthStr = `Basic ${new Buffer('zcyadmin:vK6olR5IzoceCP8u').toString('base64')}`
// 调用接口时的校验参数
let authorizationValue = ''

function jsonParse (data) {
  try {
    return JSON.parse(data)
  } catch (e) {
    return {}
  }
}

/**
 * oauth接口的url
 */
function getOauthUri () {
  return `${proxyOptions.rules.uaa.host}/oauth/token?grant_type=password&username=${proxyOptions.user.account}&password=${proxyOptions.user.password}`
}

/**
 * 获取认证数据
 */
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
    authorizationValue = `${data.token_type} ${data.access_token}`
  })
}

getAuthorization()

// 每小时固定执行，避免失效
setInterval(() => {
  authorizationValue = ''
  getAuthorization()
}, 60 * 60 * 1000)


proxy.on('error', function (error) {
  debug('proxy error:', error)
})

proxy.on('proxyReq', function (proxyReq) {
  proxyReq.setHeader('Authorization', authorizationValue)
})

proxy.on('proxyRes', function (proxyRes, req, res) {
  if (proxyRes.statusCode !== 200) {
    proxyRespJson(res, proxyRes.headers['content-encoding'], (body) => {
      debug('请求远端服务异常，采用本地mock数据', req.path)
      const callback = mockData[req.path]
      // 传入req，用于部分mock获取request的数据
      return callback ? callback(req) : {}
    })
  }
})

module.exports = (app) => {
  /**
   * 初始化路由分发
   */
  _.forIn(proxyOptions.rules, (rule, key) => {
    _.forEach(rule.urls, (url) => {
      url && app.all(url, (req, res) => {
        proxy.web(req, res, {target: rule.host, changeOrigin: true})
      })
    })
  })
}