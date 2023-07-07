var express = require('express')
var router = express.Router()
const AccountModel = require('../models/AccountModel')

router.get('/', (req, res) => {
  res.redirect('/accounts')
})

router.get('/accounts', (req, res) => {
  AccountModel
    .find()
    .sort({time: -1})
    .then((accounts) => {
      res.render('index', { accounts })
    })
    .catch(console.log)
})

router.get('/create', (req, res) => {
  res.render('create')
})

router.post('/accounts', (req, res) => {
  AccountModel
    .create({
      ...req.body,
      time: new Date(req.body.time)
    })
    .then(() => {
      res.render('success', { message: '添加成功', redirect_url: '/' })
    })
    .catch(() => {
      res.render('fail', { message: '添加失败', redirect_url: '/' })
    })
})

router.delete('/accounts/:id', (req, res) => {
  const id = req.params.id

  AccountModel
    .deleteOne({_id: id})
    .then(result => {
      if (result && result.deletedCount > 0) {
        res.json({code: 200, message: '删除成功', result})
      } else {
        res.status(500).json({code: 500, message: '删除失败', result})
      }
    })
    .catch((err) => {
      res.status(500).json({code: 500, message: '删除失败', err})
    })
})

module.exports = router
