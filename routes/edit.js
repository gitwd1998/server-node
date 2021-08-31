const express = require('express');
const app = express();
const connection = require('../mysql');
app.use(express.urlencoded({ extended: false }));
// 修改
app.post('/', (req, res, next) => {
  connection.query(`update blog set title='${req.body.title}',content='${req.body.content}',time='${req.body.time}' where id='${req.body.id}'`, (error, data, fields) => {
    if (error) throw error;
    res.send({ code: '0', data, msg: '编辑成功' });
  });
});
module.exports = app;

