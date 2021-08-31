var express = require('express');
var app = express();
var connection = require('../mysql');
app.use(express.urlencoded({ extended: false }));
//详情
app.post('/', (req, res, next) => {
  connection.query(`select * from blog where id=${req.body.id}`, (err, data, fields) => {
    if (err) throw err;
    res.send({ code: '0', data: data[0], msg: '查看详情成功' });
  })
});

module.exports = app;

