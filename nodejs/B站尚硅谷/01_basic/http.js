const http = require('http')

const server = http.createServer((request, response) => {
  response.setHeader('Content-type', 'text/html; charset=utf-8')

  response.end(request.url)
})


server.listen(3333, () => {
  console.log('Server is listening on port 3333')
}) 