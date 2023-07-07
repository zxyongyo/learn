const express = require('express')
const {
  getCategories,
  getCategoryById,
  insertCategory,
  deleteCategoryById,
  updateCategory
} = require('../router_handler/articleCate')
const joiValidater = require('../middleware/joiValidater')
const schema = require('../schema/articleCate')

const router = express.Router()

router.get('/categories', getCategories)

router.get('/categories/:id', joiValidater(schema.paramsId), getCategoryById)

router.post('/categories', joiValidater(schema.category), insertCategory)

router.delete(
  '/categories/:id',
  joiValidater(schema.paramsId),
  deleteCategoryById
)

router.patch('/categories', joiValidater(schema.updateCategory), updateCategory)

module.exports = router
