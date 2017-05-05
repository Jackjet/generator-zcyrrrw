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
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: resolve("src/components"),
      styles: resolve("src/styles")
    },
  },
  postcss: () => {
    return [require('autoprefixer')]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: process.env.NODE_ENV === 'production' ? '' : /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]  
  }
}
debug('webpakc base配置创建成功')