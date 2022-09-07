const fs = require('fs')

const readStream = fs.createReadStream('./output.txt')
const writeStream = fs.createWriteStream('./data/data.txt')

readStream.pipe(writeStream)