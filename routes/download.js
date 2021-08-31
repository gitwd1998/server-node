const express = require('express');
const app = express();
const connection = require('../mysql');
const fs = require('fs')
app.use(express.urlencoded({ extended: false }));

// 下载
app.get('/', (req, res, next) => {
  const file = fs.readFileSync('upload/工作表模板.xlsx', 'utf-8')
  res.send({ code: '0', data: file, msg: '下载成功' })
});

module.exports = app;