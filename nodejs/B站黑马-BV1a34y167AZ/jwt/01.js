const express = require('express')
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')
const cors = require('cors')

const app = express()

const secretKey = 'zxyong**-_-'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(expressjwt({ 
  secret: secretKey, 
  algorithms: ["HS256"] ,
}).unless({ path: ['/login'] }))

app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '10m' })
    res.send({
      code: 0,
      message: 'login success',
      result: token
    })
  } else {
    res.send({
      code: 1,
      message: 'login failed',
      result: null
    })
  }
})

app.get('/user', (req, res) => {
  res.send(req.auth)
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      code: 1,
      message: 'Invalid token',
      result: null
    })
  }
  res.send({
    code: 1,
    message: 'Internal error',
    result: null
  })
})

app.listen(80, () => {
  console.log('Server is listening on http://127.0.0.1')
})
