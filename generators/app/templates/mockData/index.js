module.exports = {
  '/api/zoss/getDownLoadUrl': function () {
    return {
      id: 1,
      name: 'test'
    }
  },
  '/api/test': function (req) {
    if (req.method === 'POST') {
      return {
        result: 'post'
      }
    }
    return {
      result: 'get'
    }
  }
}
