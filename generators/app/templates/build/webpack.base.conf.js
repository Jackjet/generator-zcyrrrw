const path = require('path')
const utils = require('./utils')
const config = require('../config')
const debug = require('debug')('app:config:base')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

debug('创建webpakc base配置')

module.exports = {
  entry: {
    app: './src/main.js',
    // vendor: [
    //   'react',
    //   'react-redux',
    //   'react-router',
    //   'redux'
    // ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  // externals: {
  //   'react/lib/ExecutionEnvironment': true,
  //   'react/lib/ReactContext':true,
  //   'react/addons': true
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude : /node_modules/,
        loader: 'babel-loader',
        query:{
          cacheDirectory : true,
          presets: [['es2015', { "loose": true }],'stage-0'],
          plugins: ["transform-es3-property-literals", "transform-es3-member-expression-literals"]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
debug('webpakc base配置创建成功')