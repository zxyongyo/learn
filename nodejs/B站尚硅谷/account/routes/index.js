var express = require('express')
var router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const shortid = require('shortid')

const adapter = new FileSync(path.resolve(__dirname, '../db.json'))
const db = low(adapter)

router.get('/', function (req, res, next) {
  const accounts = db.get('accounts').value()
  res.render('index', { accounts })
})

router.get('/create', (req, res, next) => {
  res.render('create')
})

router.post('/create', (req, res, next) => {
  const id = shortid.generate()
  const result = db
    .get('account')
    .unshift({ id, ...req.body })
    .write()

  if (result) {
    res.render('success', { message: '添加成功', redirect_url: '/' })
  } else {
    res.render('fail', { message: '添加失败', redirect_url: '/' })
  }
})

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  console.log(id)

  const result = db.get('accounts').remove({ id }).write()

  if (result && result.length) {
    res.json({code: 200, message: '删除成功', result})
  } else {
    res.json({code: 403, message: '删除失败', result})
  }
})

module.exports = router
