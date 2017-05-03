const debug = require('debug')('app:server:hot')
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
debug('Creating Hot Hook')
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})