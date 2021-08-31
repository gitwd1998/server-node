const express = require('express');
const app = express();
const connection = require('../mysql');
app.use(express.urlencoded({ extended: false }));

// 删除
app.post('/', (req, res, next) => {
  connection.query(`delete from blog where id=${req.body.id}`, (err, data, fields) => {
    if (err) throw err;
    res.send({ code: '0', data, msg: '删除成功' });
  })
});

// 批量删除
app.post('/batch', (req, res, next) => {
  connection.query(`delete from blog where id in (${req.body.ids})`, (err, data, fields) => {
    if (err) throw err;
    res.send({ code: '0', data, msg: '删除成功' });
  })
});

module.exports = app;