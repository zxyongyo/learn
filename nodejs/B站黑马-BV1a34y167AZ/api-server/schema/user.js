const joi = require('joi')

const username = joi.string().alphanum().min(3).max(16).required()
const password = joi
  .string()
  .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
  .required()
const email = joi
  .string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

exports.register = joi.object({
  body: {
    username,
    password,
    nickname: joi.string(),
    email,
    user_pic: joi.string().dataUri()
  }
})

exports.login = joi.object({
  body: { username, password }
})

exports.updataUserinfo = joi.object({
  body: { nickname: joi.string(), email, user_pic: joi.string().dataUri() }
})

exports.changePassword = joi.object({
  body: {
    oldPassword: password,
    newPassword: joi.not(joi.ref('oldPassword')).concat(password)
  }
})
