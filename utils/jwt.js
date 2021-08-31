const jwt = require('jsonwebtoken')
// 秘钥
const jwtSecret = '110futurenodemongodbvue'
// 生成token
exports.generateToken = (user, pass) => {
  const token = jwt.sign({ user, pass }, jwtSecret, { expiresIn: 24 * 60 * 60 });
  return token
}
// 获取token
exports.getToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject({ code: 401, msg: '没有获取到token' })
    } else {
      const data = jwt.verify(token, jwtSecret)
      resolve(data) //解析返回的值
    }
  })
}
