var todoController = require('./controllers/todoController')
var express = require('express')
var app = new express()

app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.listen(3000)
console.log('listen on port 3000')

todoController(app)