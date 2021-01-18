const mysql = require('mysql');
const util = require("util");

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'tanya555',

  database: 'employeeDB',
});


connection.connect();
// setting up connection.query to use promises 
connection.query = util.promisify(connection.query);



module.exports = connection;
