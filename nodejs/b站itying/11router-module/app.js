const express = require('express')
const app = express()
const router = express.Router()

const user = require('./routes/user')

app.use('/user', user)

app.get('/', (req, res) => {
  res.send('home')
})
app.listen(3000)