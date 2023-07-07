const express = require('express')
const cors = require('cors')
const path = require('path')
const { expressjwt } = require('express-jwt')
const { secretKey } = require('./constants')
const Resp = require('./utils/Resp')
const userRouter = require('./router/user')
const articleCate = require('./router/articleCate')
const articleRouter = require('./router/article')

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  expressjwt({
    secret: secretKey,
    algorithms: ['HS256']
  }).unless({ path: ['/register', '/login', /^\/cover_img\//] })
)

app.use('/', userRouter)
app.use('/', articleCate)
app.use('/', articleRouter)

app.all('*', (req, res) => {
  res.send(new Resp(Resp.Fail, 'request not found'))
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send(new Resp(Resp.Fail, 'please login'))
  }
  console.log(err)
  res.send(new Resp(Resp.Fail, 'internal service error', err))
})

app.listen(80, () => {
  console.log('Server is listening on http://127.0.0.1')
})
