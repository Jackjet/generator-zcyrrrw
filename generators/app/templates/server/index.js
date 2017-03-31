const express = require('express')

const app = express()

app.use(express.static('../dist'))

const router = express.Router()
app.use('/', router)
// 添加路由
// devRouter(router)
router.all('/*', (req, res, next) => {
  res.sendFile('/Users/chenkaixia/workSpace/ZCY/zcy-IE8/dist/index.html')
})

app.listen(3000)