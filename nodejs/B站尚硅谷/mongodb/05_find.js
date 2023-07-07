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

  // BookModel
  //   .findById('648148e5ed188db164e6539a')
  //   .then(console.log, err => {
  //     console.log('Delete failed')
  //     console.log(err)
  //   })
  //   .finally(Mongoose.disconnect)

  // BookModel
  //   .findOne({author: 'zxyong'})
  //   .then(console.log, err => {
  //     console.log('Delete failed')
  //     console.log(err)
  //   })
  //   .finally(Mongoose.disconnect)

  BookModel
    .find()
    .then(console.log, err => {
      console.log('Delete failed')
      console.log(err)
    })
    .finally(Mongoose.disconnect)
})

conn.on('error', err => {
  console.log('connect failed')
})

conn.on('close', err => {
  console.log('connection closed')
})
