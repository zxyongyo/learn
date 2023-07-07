const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/users')

const connection = mongoose.connection

connection.once('open', () => {
  console.log('connect succeeded')

  const accountSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  })

  const AccountModel = mongoose.model('accounts', accountSchema)

  AccountModel.create({
    username: '1203123999',
    password: '123456789'
  }).then(res=> {
    console.log(res)
  }, err => {
    console.log(err)
  })
})

connection.on('error', err => {
  console.log('connect failed')
})

connection.on('close', err => {
  console.log('connection closed')
})