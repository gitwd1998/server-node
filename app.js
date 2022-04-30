const createError = require('http-errors');
const express = require('express');
const app = express();//初始化
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
app.use(cors());//跨域中间件
const history = require('connect-history-api-fallback');
app.use(history());//配置history模式

const connection = require('./mysql');
const { getToken } = require('./utils/jwt');

// // 自定义跨域中间件
// const allowCORS = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// }
// // 使用跨域中间件
// app.use(allowCORS);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist/0.1.0')));



// 白名单, 不需要进行验证token的api
const apiwhitelist = ['/captcha', '/login', '/regist'];

// 请求拦截
app.use((req, res, next) => {
  // 获取当前访问的api地址
  const url = req._parsedUrl.pathname;
  if (apiwhitelist.includes(url)) return next();
  // 前端请求头中的字段都会转成首字母, 但后端接收到的都是小写
  const token = req.headers.authorization;
  getToken(token).then((data) => {
    const { username, password, iat, exp } = data;
    connection.query(`select * from user where username='${username}' and password='${password}'`, (err, data, fields) => {
      if (err) throw err;
      if (!data.length) {
        res.send({ code: 401, msg: '无效的token' });
      } else {
        next();
      }
    });
  }).catch((err) => {
    res.send(err);
  });
});


// 一级路由
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/regist', require('./routes/regist'));
app.use('/init', require('./routes/init'));
app.use('/captcha', require('./routes/captcha'));
app.use('/detail', require('./routes/detail'));
app.use('/add', require('./routes/add'));
app.use('/edit', require('./routes/edit'));
app.use('/delete', require('./routes/delete'));
app.use('/upload', require('./routes/upload'));
app.use('/download', require('./routes/download'));
app.use('/getUserInfo', require('./routes/getUserInfo'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
