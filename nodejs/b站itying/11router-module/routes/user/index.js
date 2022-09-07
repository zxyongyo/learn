const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
  res.send('用户列表')
})

router.get('/add', (req, res) => {
  res.send('添加用户')
})

router.get('/delete', (req, res) => {
  res.send('删除用户')
})

module.exports = router