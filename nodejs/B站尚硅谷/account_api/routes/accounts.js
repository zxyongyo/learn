var express = require('express')
var router = express.Router()
const AccountModel = require('../models/AccountModel')
const Resp = require('../utils/Resp')

router.get('/accounts', async (req, res) => {
  try {
    const accounts = await AccountModel.find().sort({ time: -1 })
    res.json(new Resp(Resp.Success, '获取成功', accounts))
  } catch (e) {
    console.log(e)
    res.json(new Resp(Resp.Fail, '获取失败', null))
  }
})

router.get('/accounts/:id', async (req, res) => {
  const id = req.params.id

  try {
    const account = await AccountModel.findById(id)
    res.json(new Resp(Resp.Success, '获取成功', account))
  } catch (e) {
    console.log(e)
    res.json(new Resp(Resp.Fail, '获取失败', null))
  }
})

router.post('/accounts', async (req, res) => {
  try {
    const result = await AccountModel.create({
      ...req.body,
      time: new Date(req.body.time)
    })
    const account = await AccountModel.findById(result._id)
    res.json(new Resp(Resp.Success, '新增成功', account))
  } catch (e) {
    console.log(e)
    res.json(new Resp(Resp.Fail, '新增失败', null))
  }
})

router.patch('/accounts/:id', async (req, res) => {
  const id = req.params.id
  try {
    const account = await AccountModel.findById(id)
    if (account) {
      await AccountModel.updateOne({ _id: id }, req.body)
      res.json(new Resp(Resp.Success, '更新成功', account))
    } else {
      res.json(new Resp(Resp.Fail, '更新失败', null))
    }
  } catch (e) {
    console.log(e)
    res.json(new Resp(Resp.Fail, '更新失败', null))
  }
})

router.delete('/accounts/:id', async (req, res) => {
  const id = req.params.id

  try {
    const result = await AccountModel.deleteOne({ _id: id })
    if (result && result.deletedCount > 0) {
      res.json(new Resp(Resp.Success, '删除成功', null))
    } else {
      res.json(new Resp(Resp.Fail, '删除失败', null))
    }
  } catch (e) {
    console.log(e)
    res.json(new Resp(Resp.Fail, '删除失败', null))
  }
})

module.exports = router
