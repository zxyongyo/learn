const Mongoose = require('mongoose')

const schema = new Mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: new Date()
  },
  type: {
    type: Number,
    enum: [1, -1],
    default: -1
  },
  account: {
    type: Number,
    required: true
  },
  remarks: String
})

const AccountModel = Mongoose.model('accounts', schema)

module.exports = AccountModel
