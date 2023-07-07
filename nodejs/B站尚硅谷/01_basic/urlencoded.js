const express = require('express')
const qs = require('querystring')

const app = express()

app.use((req, res, next) => {
  let str = ''

  req.on('data', chunk => {
    str += chunk
  })

  req.on('end', () => {
    try {
      const json = JSON.parse(str)
      req.body = json
      next()
    } catch (e) {
      const data = qs.parse(str)
      req.body = data
      next()
    }
  })

  req.on('error', (err) => {
    console.log(err)
    next()
  })
})

app.post('/test', (req, res) => {
  res.send(req.body)
})

app.listen(3000, () => {
  console.log('server is listening on http://127.0.0.1:3000')
})