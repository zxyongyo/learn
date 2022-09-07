const fs = require('fs')

let str = ''
for(let i=0; i<1000; i++){
  str += 'zzyuog凯夫拉的说法阿东萨哈佛i暗黑公会i熬过黄蓉饿啊烘热感'
}

const writeStream = fs.createWriteStream('./output.txt')  // 创建写入流
writeStream.write(str)  // 写入
writeStream.end() // 标记文件尾 标记文件尾才能监听到写入完成
writeStream.on('finish', () => {  // 监听完成
  console.log('写入完成')
})