const mysql = require('knex')({
  "client": "mysql",
  "connection": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "1234",
    "database": "klapi",
    "charset"   : 'utf8mb4'
  }
});
module.exports = mysql;