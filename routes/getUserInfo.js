const express = require('express');
const app = express();
const connection = require('../mysql');
app.use(express.urlencoded({ extended: false }));

const { getToken } = require('../utils/jwt')

app.post('/', (req, res, next) => {
  const { token } = req.body
  getToken(token).then((jwt) => {
    const { username, password, iat, exp } = jwt
    connection.query(`select * from user where username='${username}' and password='${password}'`, (err, data, fields) => {
      if (err) throw err;
      if (data.length) {
        res.send({ code: '0', data: data[0], msg: '查询用户信息成功' })
      } else {
        res.send({ code: '401', data: null, msg: '无效的token' })
      }
    })
  }).catch((err) => {
    res.send(err)
  })
})

module.exports = app;
