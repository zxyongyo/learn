const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

module.exports = app = {
  static: (req, res, staticPath) => {
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
  },
  news: (req, res) => {
    // 获取get传值 给ejs模板传值
    const params = new URL(req.url, 'http://' + req.headers.host).search
    ejs.renderFile('./views/news.ejs', {
      msg: 'this is a ejs template',
      list: [{
          name: 'aaaaaa'
        },
        {
          name: 'bbbbb'
        },
        {
          name: 'bvvsd'
        },
        {
          name: 'afaerhre'
        }
      ],
      params: params
    }, (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      res.end(data)
    })
  },
  login: (req, res) => {
    ejs.renderFile('./views/login.ejs', {}, (err, data) => {
      res.end(data)
    })
  },
  doLogin: (req, res) => {
    let formData = ''
    req.on('data', (chunk) => {
      formData += chunk
    })
    req.on('end', () => {
      res.end(formData)
    })
  },
  error: (req, res) => { 
    res.end('404')
  }
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