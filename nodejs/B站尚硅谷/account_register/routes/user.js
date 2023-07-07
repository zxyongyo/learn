const express = require('express')
const router = express.Router()
const md5 = require('md5')
const Resp = require('../utils/Resp')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
  const {username, password} = req.body
  if (!username || !password) {
    res.send(new Resp(Resp.Fail, 'please type your username & password', null))
    return
  }

  try {
    const result = await UserModel.create({
      username,
      password: md5(password)
    })
    res.send(new Resp(Resp.Success, 'register success', result))
  } catch (e) {
    console.log(e)
    res.send(new Resp(Resp.Fail, 'register Failed', null))
  }
})

router.post('/login', async (req, res) => {
  const {username, password} = req.body
  if (!username || !password) {
    res.send(new Resp(Resp.Fail, 'please type your username & password', null))
    return
  }

  try {
    const result = await UserModel.findOne({
      username,
      password: md5(password)
    })
    if (result) {
      const token = jwt.sign({
        username: result.username,
        userId: result._id
      }, 'zxyong', {
        expiresIn: 60 * 60 * 24 * 7
      })
      res.send(new Resp(Resp.Success, 'login success', token))
    } else {
      res.send(new Resp(Resp.Fail, 'username or password is wrong', null))
    }
  } catch (e) {
    console.log(e)
    res.send(new Resp(Resp.Fail, 'login Failed', null))
  }
})

module.exports = router