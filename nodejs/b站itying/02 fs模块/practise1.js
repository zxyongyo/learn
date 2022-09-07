// 图片上传：判断服务器上有没有upload目录，如果没有创建这个目录，如果有不做操作

const fs = require('fs')
const path = './upload'

fs.stat(path, (err, stats) => {
  if (err) {
    mkdir(path)
    return
  }
  if (stats.isFile()) {
    // 如果存在upload文件 先删除在创建
    fs.unlink(path, (err => {
      if (err) {
        console.log(err)
        return
      } else {
        mkdir(path)
      }
    }))
  } else if (stats.isDirectory()) {
    console.log('存在upload目录')
  } else {
    mkdir(path)
  }
})

const mkdir = dir => {
  fs.mkdir(dir, (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('创建成功')
  })
}