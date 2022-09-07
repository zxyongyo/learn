/**
 * 1. fs.stat         检查是文件还是目录
 * 2. fs.mkdir        创建目录
 * 3. fs.writeFile    创建写入文件
 * 4. fs.appendFile   追加写入文件
 * 5. fs.readFile     读取文件
 * 6. fs.readdir      读取目录
 * 7. fs.rename       重命名
 * 8. fs.rmdir        删除目录
 * 9. fs.unlink       删除文件
 */
const fs = require('fs')

/*
// 检查是文件还是目录
fs.stat('../01', (err, stats) => {
  if(err) {
    console.log(err)
    return
  }
  console.log('目录' + stats.isDirectory())
  console.log('文件' + stats.isFile())
})
*/

/*
// 创建目录  recursive - 递归创建
fs.mkdir('./css/scss', { recursive: true }, err => {
  if(err) {
    console.log(err)
    return
  }
  console.log('创建成功')
})
*/

/*
// 创建写入文件 覆盖写入
fs.writeFile('./css/index.css', 'h1{color: red}\n', err => {
  if(err) {
    console.log(err)
    return
  }
  console.log('写入成功')
})
*/

/* 
// 追加写入
fs.appendFile('./css/index.css', 'h1{color: red}\n', err => {
  if(err){
    console.log(err)
    return
  }
  console.log('写入成功')
})
*/

/*
// 读取文件 读到的是buffer
fs.readFile('./css/index.css', (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data.toString())
})
*/

/*
// 读取目录
fs.readdir('./css', (err, files) => {
  if(err) {
    console.log(err)
    return
  }
  console.log(files)
})
*/

/* 
// 重命名 移动
fs.rename('./css/scss', './css/sass', err => {
  if(err){
    console.log(err)
    return
  }
  console.log('重命名成功')
})
*/

/* 
// 删除文件
fs.unlink('./css/aa.css', err => {
  if(err){
    console.log(err)
    return
  }
  console.log('删除成功')
})
*/

// 删除目录
fs.rmdir('./css/sass', err => {
  if(err){
    console.log(err)
    return
  }
  console.log('删除成功')
})