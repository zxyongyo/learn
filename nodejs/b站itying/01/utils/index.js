const sd = require('silly-datetime')

const formatApi = api => {
  return 'http://xmpeihu.com/' + api
}
const date = () => {
  return sd.format(new Date())
}

exports.formatApi = formatApi
exports.getDate = date