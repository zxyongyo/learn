const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname, './assets')))

app.get('/', (req, res) => {
  res.end('<h1>hello express</h1>')
})

app.get('*', (req, res) => {
  res.end('<h1>404 Page not Found</h1>')
})

app.listen(3333, () => {
  console.log('Server is listening on port 3333')
}) 