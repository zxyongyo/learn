const jwt = require('jsonwebtoken')
const Resp = require('../utils/Resp')

module.exports = (req, res, next) => {
  const token = req.get('token')
  if (token) {
    jwt.verify(token, 'zxyong', (err, data) => {
      if (err) {
        console.log(err)
        res.json(new Resp(Resp.Fail, '请重新登录', null))
        return
      }
      console.log(data)
      next()
    })
  } else {
    res.json(new Resp(Resp.Fail, '未登录', null))
  }
}
