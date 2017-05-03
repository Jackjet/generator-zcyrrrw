const utils = require('./utils')
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const debug = require('debug')('app:config:dev')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

Object.keys(baseWebpackConfig.entry).forEach((name) => {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

debug(`合并webpack ${config.dev.env.NODE_ENV}环境配置`)

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  //devtool: '#cheap-module-eval-source-map',
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor'],
    //   // minChunks: function (module, count) {
    //   //   // any required modules inside node_modules are extracted to vendor
    //   //   return (
    //   //     module.resource &&
    //   //     /\.js$/.test(module.resource) &&
    //   //     module.resource.indexOf(
    //   //       path.join(__dirname, '../node_modules')
    //   //     ) === 0
    //   //   )
    //   // }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})

debug(`合并webpack ${config.dev.env.NODE_ENV}环境配置成功`)