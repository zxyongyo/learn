const express = require('express')
const userHandler = require('../router_handler/user')
const joiValidater = require('../middleware/joiValidater')
const schema = require('../schema/user')

const router = express.Router()

router.post('/register', joiValidater(schema.register), userHandler.register)

router.post('/login', joiValidater(schema.login), userHandler.login)

router.get('/userinfo', userHandler.getUserinfo)

router.patch(
  '/userinfo',
  joiValidater(schema.updataUserinfo),
  userHandler.updateUserinfo
)

router.patch(
  '/password',
  joiValidater(schema.changePassword),
  userHandler.changePassword
)

module.exports = router
