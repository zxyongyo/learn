const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

// body-parser middleware
const parser = bodyParser.urlencoded({ extended: false })
// app.use(parser)

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, './form.html'))
})

app.post('/login', parser, (req, res) => {
  console.log(req.body)
  res.send('Login success')
})

app.get('/', (req, res) => {
  res.end('<h1>hello express</h1>')
})

app.get('*', (req, res) => {
  res.end('<h1>404 Page not Found</h1>')
})

app.listen(3333, () => {
  console.log('Server is listening on port 3333')
})
