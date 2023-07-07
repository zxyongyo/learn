const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.end('hello express')
})

app.get('/:category/:id.html', (req, res) => {
  const {category, id} = req.params
  console.log({category, id})
  res.json({category, id})
})

app.get('*', (req, res) => {
  res.end('<h1>404 Page not Found</h1>')
})

app.listen(3333, () => {
  console.log('Server is listening on port 3333')
})