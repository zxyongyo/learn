const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser('abc123..'))

app.get('/', (req, res) => {
  res.cookie('username', '张大大', { signed: true })
  res.send('cookie设置成功')
})

app.get('/getCookie', (req, res) => {
  res.send(req.signedCookies.username)
})

app.get('/removeCookie', (req, res) => {
  res.cookie('username', '', { expires: new Date(0) })
  res.send('cookie移除成功')
})

app.listen(3000, ()=> {console.log('listen on port 3000')})