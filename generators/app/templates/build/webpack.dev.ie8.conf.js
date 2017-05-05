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

debug(`合并webpack ${config.dev.env.NODE_ENV}环境配置`)

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      extract: true
    }),
    postLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'es3ify-loader'
      }
    ]
  },
  //devtool: '#cheap-module-eval-source-map',
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    new webpack.NoErrorsPlugin(),
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
    })
  ]
})

debug(`合并webpack ${config.dev.env.NODE_ENV}环境配置成功`)