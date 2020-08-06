const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "200.132.13.90",
  user: "roger",
  password: "roger",
  database: "luan"
});

module.exports = connection;