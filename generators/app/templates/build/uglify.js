const fs = require('fs')
const path = require('path')
const config = require('../config')
const UglifyJS = require("uglify-js")
function resolve(_path){
  return path.resolve(__dirname, config.build.assetsRoot, config.build.assetsSubDirectory, _path)
}

function loopFs(_path){
  fs.readdir(resolve(_path), (err, files) => {
    files.forEach((file, index) => {
      
      let filePath = resolve(_path + '/' + file)
      fs.stat(filePath, (err, stats) => {
        if(stats.isDirectory()){
          loopFs(resolve(file))
        }else{
          console.log(file, /\.(css|js)$/.test(file))
          if(/\.(css|js)$/.test(file)){
            let result = UglifyJS.minify(filePath)
          }
        }
      })
      
        
    })
  })
}

loopFs('.')
  
// let result = UglifyJS.minify(path.resolve(__dirname, '../dist/static/js/0.js'), {
//   mangle:true,

// });
// console.log(result)