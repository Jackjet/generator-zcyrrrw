const path    = require('path')
const webpack = require('webpack')
const config = require('../config')

let vendors = ['react', 'react-dom', 'lodash']

module.exports = {
  entry: {
      vendor: vendors
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(config.build.assetsRoot, '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
};