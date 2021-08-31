const express = require('express');
const app = express();
const connection = require('../mysql');
const formidable = require('formidable');
const fs = require('fs')
const path = require('path')
app.use(express.urlencoded({ extended: false }));
const { getToken } = require('../utils/jwt')

// 上传
app.post('/', (req, res, next) => {
  const form = new formidable.IncomingForm({
    encoding: "utf-8",
    uploadDir: "upload",  //文件上传地址
    keepExtensions: true  //保留后缀
  });
  form.parse(req, (err, fields, files) => {
    const data = [];
    for (let i in files) {
      const oldName = files[i].path;
      const newName = "upload/" + files[i].name;
      // 文件名称重复会替换
      fs.renameSync(oldName, newName)
      const url = fs.realpathSync(newName);
      const name = files[i].name
      data.push({ url, name })
    }
    res.send({ code: 0, data, msg: "操作成功" })
  });
});

app.post('/head', async (req, res, next) => {
  const token = req.headers.authorization
  const { user, pass, iat, exp } = await getToken(token)
  const form = new formidable.IncomingForm({
    encoding: "utf-8",
    uploadDir: "upload",  //文件上传地址
    keepExtensions: true  //保留后缀
  });
  form.parse(req, (err, fields, files) => {
    let data = {};
    for (let i in files) {
      let url = fs.realpathSync(files[i].path)
      url = encodeURI(url)
      data = { url }
      console.log(url);
      connection.query(`update user set head='${url}' where user='${user}'`, (error, data, fields) => {
        if (error) throw error;
      });
    }
    res.send({ code: '0', data, msg: "修改成功" })
  });
})

module.exports = app;