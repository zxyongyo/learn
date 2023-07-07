const joi = require('joi')
const id = joi.number().integer().required()

exports.category = joi.object({
  body: {
    name: joi.string().required(),
    alias: joi.string().alphanum().required()
  }
})

exports.updateCategory = joi.object({
  body: {
    id,
    name: joi.string(),
    alias: joi.string().alphanum()
  }
})

exports.paramsId = joi.object({
  params: { id }
})
