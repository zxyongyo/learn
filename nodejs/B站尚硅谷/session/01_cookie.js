const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send(req.cookies)
})

app.get('/set-cookie', (req, res) => {
  res.cookie('uid', '100000000001' /* ,{maxAge: 1000 * 30} */)
  res.cookie('token', 'adsfkla;sgjewa' /* ,{maxAge: 1000 * 30} */)
  res.end()
})

app.get('/remove-cookie', (req, res) => {
  res.clearCookie('token')
  res.send('removed')
})

app.listen(3333, () => {
  console.log('Listening on: http://127.0.0.1:3333')
})