const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.use((req, res, next) => {
  const {url, ip} = req
  fs.appendFileSync(
    path.resolve(__dirname, './assets/log.txt'), 
    `${new Date().toLocaleString()} ${url} ${ip} \n`
  )
  next()
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