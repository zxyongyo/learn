const app = require('express')()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, './views'))

app.get('/', (req, res) => {
  const title = 'ejs example'
  const message = 'hello ejs'
  const fruits = ['banana', 'apple', 'orange']
  res.render('./example.ejs', {title, message, fruits})
})

app.get('*', (req, res) => {
  res.end('<h1>404 Page not Found</h1>')
})

app.listen(3333, () => {
  console.log('Server is listening on port 3333')
}) 