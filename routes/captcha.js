var express = require('express');
var app = express();
var svgCaptcha = require('svg-captcha');
app.post('/', (req, res, next) => {
  var captcha = svgCaptcha.create({
    // inverse: false,//颜色反转(默认false)
    width: 100,//生成svg图片的宽度(默认150*50)
    height: 30,//生成svg图片的高度(默认150*50)
    // background: '#eee',//生成svg图片的背景(默认无色)（color属性会被强制改为true）
    size: 4,//随机字符位数(默认4)
    fontSize: 34,//随机字符字体大小(默认随机)
    ignoreChars: '0oOxXvVwWzZcC1ilI',//过滤掉指定字符（易混淆）
    noise: 2,//干扰线条数量(默认1)
    color: true,//彩色(默认false)
  });
  res.cookie('captchatext', captcha.text, { maxAge: 24 * 60 * 60 * 1000 })
  console.log('输出验证码：', captcha.text)
  res.send({ code: '0', data: captcha.data, msg: '操作成功' });
});

module.exports = app;