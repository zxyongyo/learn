const Mongoose = require('mongoose')

module.exports = function () {
  return new Promise((res, rej) => {
    Mongoose.connect('mongodb://127.0.0.1:27017/bilibili')
  
    const conn = Mongoose.connection
    
    conn.once('open', () => {
      console.log('Connect succeeded')
      res(Mongoose)
    })
    
    conn.on('error', err => {
      console.log('Connect failed')
      rej(err)
    })
    
    conn.on('close', err => {
      console.log('Connection closed')
    })
  })
}