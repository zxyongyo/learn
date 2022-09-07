const http = require('http');
const app = require('./modules/route')
const ejs = require('ejs')

app.static('static')
http.createServer(app).listen(8081);

app.get('/login', (req, res) => {
  ejs.renderFile('./views/login.ejs', (err, data) => {
    res.send(data)
  })
})

app.post('/doLogin', (req, res) => {
  res.send(req.body)
})

console.log('Server running at http://127.0.0.1:8081/')