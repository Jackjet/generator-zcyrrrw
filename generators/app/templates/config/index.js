const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    autoOpenBrowser: true,
    cssSourceMap: false,
    proxyTable: {
    }
  }
}