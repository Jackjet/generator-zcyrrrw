/**
 * 接口代理转发
 * 针对多个域名，分别进行接口转发
 */
module.exports = {
  // 代理地址
  HOST: 'http://middle.dev.cai-inc.com',
  proxyTable: {
    '/api/*': {}
  }
}
