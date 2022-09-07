// 找到一个目录下所有目录放到一个数组

const fs = require('fs')

// async await实现
const isDir = async path => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      if (stats.isDirectory()) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

const main = () => {
  const dirArr = []
  fs.readdir('./src', async (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    for (let i = 0; i < files.length; i++) {
      if (await isDir('./src/' + files[i])) {
        dirArr.push(files[i])
      }
    }
    console.log(dirArr)
  })
}
main()


// 递归实现
/* 
const dirArr = []
fs.stat('./src', (err, stats) => {
  if (err) {
    console.log(err)
    return
  }
  if (!stats.isDirectory()) {
    console.log('没有这个目录')
  }
  fs.readdir('./src', (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    (function pushDir(i) {
      if (i >= files.length) {
        console.log(dirArr)
        return
      }
      fs.stat('./src/' + files[i], (err, stats) => {
        if (err) {
          console.log(err)
          return
        }
        if (stats.isDirectory()) {
          dirArr.push(files[i])
        }
        pushDir(i + 1)
      })
    })(0)
  })
}) */
