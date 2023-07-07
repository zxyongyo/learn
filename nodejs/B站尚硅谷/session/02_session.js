const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()

app.use(session({
  name: 'sid',
  secret: 'zxyong',
  saveUninitialized: false,
  resave: true,
  // store: MongoStore.create({
  //   mongoUrl: 'mongodb://127.0.0.1:27017/bilibili'
  // }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 5
  }
}))

app.get('/', (req, res) => {
  res.send('')
})

app.get('/login', (req, res) => {
  const {username, password} = req.query
  if (username && password) {
    req.session.username = username
    res.send('success')
  } else {
    res.send('failed')
  }
})

app.get('/user', (req, res) => {
  if (req.session.username) {
    res.send(`Welcome, ${req.session.username}`)
  } else {
    res.send('Not logged in')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    } else {
      res.send('logged out')
    }
  })
})

app.listen(3333, () => {
  console.log('Listening on: http://127.0.0.1:3333')
})