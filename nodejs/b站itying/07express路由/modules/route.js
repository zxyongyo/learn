const fs = require('fs')
const path = require('path')

// res.send()
const resSend = res => {
  res.send = data => {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset="utf-8"'
    });
    res.end(data)
  }
}
// 静态资源
const initStatic = (req, res, staticPath) => {
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

const app = (req, res) => {
  // res.send()
  resSend(res)
  // 静态资源
  initStatic(req, res, G.staticPath)
  const path = new URL(req.url, 'http://' + req.headers.host).pathname
  const method = req.method.toLowerCase()

  if (G['_' + method][path]) {
    if (method === 'get') {
      G['_' + method][path](req, res)
    } else {
      if (G['_' + method][path]) {
        let formData = ''
        req.on('data', (chunk) => {
          formData += chunk
        })
        req.on('end', () => {
          req.body = decodeURIComponent(formData)
          G['_' + method][path](req, res)
        })
      }
    }
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html; charset="utf-8"'
    });
    res.end('404')
  }
}

const G = {
  _get: {},
  post: {},
  staticPath: 'static'
}
G._get = {}
G._post = {}

app.get = (str, callback) => {
  G._get[str] = callback
}
app.post = (str, callback) => {
  G._post[str] = callback
}
app.static = staticPath => {
  G.staticPath = staticPath
}

module.exports = app