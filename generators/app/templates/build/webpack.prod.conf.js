const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const debug = require('debug')('app:config:prod')
const es3ifyPlugin = require('es3ify-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
//const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

debug(`合并webpack ${config.build.env.NODE_ENV}环境配置`)
let webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: false,
        warnings: false
      },
      mangle: {
        screw_ie8: false
      },
      sourceMap: true
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash:8].css')),
    new es3ifyPlugin(),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    /**
     * DllReferencePlugin  webpack插件，解决三方依赖库每次构建打包的问题，提高打包效率
     * 并同时解决多项目下三方库共用的问题
     */
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('../dist/vendor-manifest.json'),
    // }),

    /**
     * 三方依赖库抽取
     */

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
  ]
})
debug(`合并webpack ${config.build.env.NODE_ENV}环境配置成功`)
module.exports = webpackConfig