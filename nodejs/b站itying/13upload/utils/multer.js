const multer = require('multer')
const path = require('path')
const sd = require('silly-datetime')
const fs = require('fs')

const storage = multer.diskStorage({
  // 文件保存路径 路径必须存在
  destination(req, file, cb) {
    const date = sd.format(new Date(), 'YYYY-MM-DD')
    const dir = path.join('public/upload', date)
    console.log(dir)
    // 判断目录是否存在
    fs.stat(dir, (error, stats) => {
      if (error) {
        fs.mkdir(dir, { recursive: true }, (err) => {
          if (err) {
            console.log(err)
            return
          }
          cb(null, dir)
        })
        return
      }
      if (stats.isDirectory()) {
        cb(null, dir)
      } else {
        fs.mkdir(dir, { recursive: true }, (err) => {
          if (err) {
            console.log(err)
            return
          }
          cb(null, dir)
        })
      }
    })
  },
  // 修改文件名
  filename(req, file, cb) {
    const extName = path.extname(file.originalname)
    cb(null, +new Date() + extName)
  }
})

module.exports = multer({
  storage
})