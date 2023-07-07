
class Resp {
  static Success = '000000'
  static Fail = '111111'

  constructor(code, message, result) {
    this.code = code
    this.message = message
    this.result = result
  }
}

module.exports = Resp