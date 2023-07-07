const express = require('express')
const {
  postArticle,
  getArticleList,
  deleteArticleById,
  getArticleById,
  updateArticle
} = require('../router_handler/article')
const multer = require('multer')
const joiValidater = require('../middleware/joiValidater')
const schema = require('../schema/article')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/cover_img')
  },
  filename(req, file, cb) {
    const name = Date.now()
    const suffix = file.originalname.split('.')[1]
    // console.log(name + '.' + suffix)
    cb(null, name + '.' + suffix)
  }
})
const upload = multer({ storage })

const router = express.Router()

router.post(
  '/articles',
  upload.single('cover_img'),
  joiValidater(schema.postArticle),
  postArticle
)

router.get('/articles', getArticleList)

router.delete(
  '/articles/:id',
  joiValidater(schema.paramsId),
  deleteArticleById
)

router.get(
  '/articles/:id',
  joiValidater(schema.paramsId),
  getArticleById
)

router.patch(
  '/articles',
  upload.single('cover_img'),
  joiValidater(schema.updateArticle),
  updateArticle
)

module.exports = router
