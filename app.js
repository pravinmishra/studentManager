var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var joi = require('joi');
var mysqlConnection = require('./connection');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");   
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");      
   next();
});

function validateToken(req, res, next) {
  var auth_token = req.headers['authorization'] || '';
  const sessionSchema = joi.object().keys({
      authorization: joi.string().required(),
  });
  var validationData = {
      authorization: auth_token
  }
  joi.validate(validationData, sessionSchema, function (err, value) {
      if (err) {
          res.send({ code: 1013, message: "Error:" + err });
      }
      else {
          var token = auth_token;

          if (token.indexOf('Bearer ') > -1) {
              token = token.substring(token.indexOf(' ') + 1);
              token = token.trim();
              sessionQuery = 'select * from sessions where access_token = ?';
              sessionQueryParams = [token];
              mysqlConnection.query(sessionQuery, sessionQueryParams, function (error, results) {
                  if (error) {
                      res.send({ Error: error });
                  }
                  else {
                      if (results.length > 0) {
                          console.log("results", results);
                          next();
                      }
                      else {
                          res.send({ code: 1012, message: "user is not authorized." });
                      }
                  }
              });
          }
          else {
              res.send({ code: 1011, message: "authoraization token not valid." });
          }
      }
  });
}


var signup = require('./signup');
app.use('/users', signup);

var login = require('./login');
app.use('/login', login);

app.use(validateToken);
var student = require('./student');
app.use('/student', student);


app.listen(8181, function () {
  console.log('Server listening on port number 8181.');
});
