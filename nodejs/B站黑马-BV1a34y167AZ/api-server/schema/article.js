const joi = require('joi')

exports.postArticle = joi.object({
  body: {
    title: joi.string().required(),
    content: joi.string().required(),
    state: joi.string(),
    cate_id: joi.number().integer().required()
  },
  file: joi.object().required().error(new Error('cover_img is required'))
})

exports.updateArticle = joi.object({
  body: {
    id: joi.number().integer().required(),
    title: joi.string(),
    content: joi.string(),
    // cover_img: joi.string(),
    state: joi.string(),
    cate_id: joi.number().integer()
  }
})

exports.paramsId = joi.object({
  params: {
    id: joi.number().integer().required()
  }
})
