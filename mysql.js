var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'sqlwd',
  password: 'wd15855385074',
  database: 'mysqltest',
});
connection.connect((err, data) => { if (err) throw err });
module.exports = connection;