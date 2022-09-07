const fs = require('fs')
const path = require('path')

exports.static = (req, res, staticPath) => {
  const url = new URL(req.url, 'http://' + req.headers.host).pathname
  if (url === '/favicon.ico') {
    return
  }
  const pathName = url == '/' ? 'index.html' : url
  try {
    const data = fs.readFileSync(staticPath + pathName)
    if (data) {
      const extName = path.extname(pathName)
      const mime = getMime(extName)
      res.writeHead(200, {
        'Content-Type': mime + '; charset="utf-8"'
      });
      res.end(data)
      return true
    }
  } catch (e) {}
  return false
}

const getMime = (ext) => {
  let data
  try {
    data = fs.readFileSync('./data/mime.json')
  } catch (e) {
    console.log(e)
    return
  }
  const mimeJSON = JSON.parse(data.toString())
  return mimeJSON[ext] || 'text/html'
}