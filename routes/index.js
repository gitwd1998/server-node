const express = require('express');
const app = express();
const path = require('path')

/* GET index page. */
app.get('/', function (req, res, next) { res.render('index', { title: 'Express' }) });

module.exports = app;