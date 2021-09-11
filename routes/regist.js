var express = require('express');
var app = express();
var connection = require('../mysql');

app.use(express.urlencoded({ extended: false }));
app.post('/', (req, res) => {
  let { username, password, phonenumber } = req.body
  connection.query(`select * from user where username='${username}'`, (err, data, fields) => {
    if (err) throw err;
    if (data.length) { res.send({ code: '1', msg: '用户名已存在' }) } else {
      connection.query(`insert into user(username, phonenumber, password) value('${username}','${phonenumber}','${password}')`, (err, data, fields) => {
        if (err) throw err;
        res.send({ code: '0', data, msg: '注册成功' })
      })
    }
  })
});

module.exports = app;