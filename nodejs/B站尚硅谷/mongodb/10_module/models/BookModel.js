const Mongoose = require('mongoose')

const bookSchema = new Mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  is_hot: Boolean
})

const BookModel = Mongoose.model('novel', bookSchema)

module.exports = BookModel