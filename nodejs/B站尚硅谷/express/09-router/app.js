const app = require('express')()
const client = require('./routes/client')
const admin = require('./routes/admin')

app.use([client, admin])

app.get('*', (req, res) => {
  res.end('<h1>404 Page not Found</h1>')
})

app.listen(3333, () => {
  console.log('Server is listening on port 3333')
}) 