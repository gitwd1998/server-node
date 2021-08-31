var express = require('express');
var app = express();
var connection = require('../mysql');
app.use(express.urlencoded({ extended: false }));
// 初始化
app.all('/', (req, res) => {
  connection.query(`select * from blog`, (err, data, fields) => {
    if (err) throw err;
    res.send({ code: '0', data, msg: '获取数据成功' })
  })
})


module.exports = app;