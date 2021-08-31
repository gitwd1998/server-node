var express = require('express');
var app = express();
var connection = require('../mysql');
const jwt = require('../utils/jwt')
app.use(express.urlencoded({ extended: false }));

app.post('/', (req, res, next) => {
  const { captchatext, user, pass } = req.body
  console.log("输出cookies", req.cookies)
  console.log("输出req.body", req.body)
  console.log("输出req.query", req.query)
  // if (captchatext !== req.cookies.captchatext) return res.send({ code: 3, msg: '验证码错误' })
  connection.query(`select * from user where user='${user}'`, (err, data, fields) => {
    if (err) throw err;
    if (data.length) {
      connection.query(`select * from user where user='${user}' and pass='${pass}'`, (err, data, fields) => {
        if (err) throw err;
        if (data.length) {
          const token = jwt.generateToken(user, pass)
          res.send({ code: '0', data: { token }, msg: '登陆成功' })
        } else { res.send({ code: '1', data: null, msg: '密码错误' }) }
      })
    } else { res.send({ code: '2', data: null, msg: '用户名不存在' }) }
  })
})

module.exports = app;
