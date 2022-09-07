const mongoose = require('./db')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true
  },
  password: String
})

module.exports = mongoose.model('User', UserSchema, 'user')