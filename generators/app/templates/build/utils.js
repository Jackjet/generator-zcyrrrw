const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = (_path) => {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = (options) => {
  options = options || {}

  function generateLoaders(loaders){
    let sourceLoader = loaders.map(function (loader) {
      let extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if(options.extract){
      return ExtractTextPlugin.extract('style-loader', sourceLoader)
    }else{
      return ['style-loader', sourceLoader].join('!')
    }
  }

  return {
    css: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
  }
}



exports.styleLoaders = (options) => {
  let output = []
  let loaders = exports.cssLoaders(options)
  for(let extension in loaders){
    let loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}