const fs = require('fs')

// exports.getMime = (ext) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile('./data/mime.json', (err, data) => {
//       if(err){
//         console.log(err)
//         reject(err)
//         return
//       }
//       const mimeJSON = JSON.parse(data.toString())
//       resolve(mimeJSON[ext] || 'text/html')
//     })
//   })
// }

exports.getMime = (ext) => {
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
