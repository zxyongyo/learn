const express = require('express')

const app = express()

const permission = (req, res, next) => {
  const name = req.query.name
  if (name === 'zxyong') {
    next()
  } else {
    res.send('<h1>Permission Denied</h1>')
  }
}

app.get('/admin', permission, (req, res) => {
  res.send('<h1>Admin</h1>')
})

app.get('/setting', permission, (req, res) => {
  res.send('<h1>Setting</h1>')
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