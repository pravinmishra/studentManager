var express = require("express");
var mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'student'
});
connection.connect((err) => {
  if (err) throw err;
  // console.log('Connected!');
});
connection.query("use student", function (err, result) {
  console.log("conected to db student");
});

module.exports = connection;