const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const webpackDllConf = require('./webpack.dll.conf')

let spinner = ora('building for dll...')
spinner.start()

webpack(webpackDllConf, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
})