const Mongoose = require('mongoose')

Mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

const conn = Mongoose.connection

conn.once('open', () => {
  console.log('connect succeeded')

  const bookSchema = new Mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
  })

  const BookModel = Mongoose.model('novel', bookSchema)

  BookModel
    .find({ author: /^张/ })
    .then(console.log, console.log)
    .finally(Mongoose.disconnect)
})

conn.on('error', err => {
  console.log('connect failed')
})

conn.on('close', err => {
  console.log('connection closed')
})
