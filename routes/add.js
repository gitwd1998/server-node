const express = require('express');
const app = express();
const connection = require('../mysql');
app.use(express.urlencoded({ extended: false }));
// 添加
app.post('/', (req, res, next) => {
  connection.query(`insert into blog(title, content, time) values('${req.body.title}', '${req.body.content}', '${req.body.time}')`, (error, data, fields) => {
    if (error) throw error;
    res.send({ code: '0', data, msg: "添加成功" });
  })
});

module.exports = app;