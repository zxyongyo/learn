const Mongoose = require('mongoose')

const schema = new Mongoose.Schema({
  username: String,
  password: String
})

const UserModel = Mongoose.model('users', schema)

module.exports = UserModel
