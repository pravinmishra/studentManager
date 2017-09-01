var express = require('express');
var router = express.Router();
var mysqlConnection = require('../connection');
var bcrypt = require('bcryptjs');

router.post('/', function (req, res) {
    //not using joi validation since sending response in each case
    var email = req.body.email;
    var password = req.body.password;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var pn = /^\d{10}$/;
    if (email === null || email === '' || email === undefined) {
        res.send({ code: 1001, message: "email or phone reqiured." });
    }
    else if (password === null || password === '' || password === undefined) {
        res.send({ code: 1002, message: "password reqiured." });
    }
    else if (re.test(email) || email.match(pn)) {
        //if user signsup using email
        if (re.test(email)) {
            checkUserEmailQuery = 'select * from users where email = ?';
            checkUserEmailQueryParams = [email];
            mysqlConnection.query(checkUserEmailQuery, checkUserEmailQueryParams, function (errror, results) {
                if (errror) {
                    console.log("errror in exist",errror);
                    res.send({ Error: errror });
                }
                if (results.length > 0) {
                    res.send({ code: 1001, message: "username already used." });
                }
                else {
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(password, salt);
                    signupAddQuery = "insert into users values(?,?,?,?,?)";
                    signupAddQueryParams = [null, email, null, hash, salt];
                    mysqlConnection.query(signupAddQuery, signupAddQueryParams, function (error, results) {
                        if (error) {
                            console.log("error in add user email",error);
                            res.send({ Error: errror });
                        }
                        else {
                            res.send({ code: 200, message: "account created successfully." });
                        }
                    });
                }
            });
        }
        //if user signsup using phone
        if (email.match(pn)) {
            checkUserPhoneQuery = 'select * from users where phoneNumber = ?';
            checkUserPhoneQueryParams = [email];
            mysqlConnection.query(checkUserPhoneQuery, checkUserPhoneQueryParams, function (errror, results) {
                if (errror) {
                    console.log("errror in exist",errror);
                    res.send({ Error: errror });
                }
                if (results.length > 0) {
                    res.send({ code: 1001, message: "username already used." });
                }
                else {
                    var saltP = bcrypt.genSaltSync(10);
                    var hashP = bcrypt.hashSync(password, saltP);
                    signupAddPhoneQuery = "insert into users values(?,?,?,?,?)";
                    signupAddPhoneQueryParams = [null, null, email, hashP, saltP];
                    mysqlConnection.query(signupAddPhoneQuery, signupAddPhoneQueryParams, function (error, results) {
                        if (error) {
                            console.log("error in add user phone",error);
                            res.send({ Error: errror });
                        }
                        else {
                            res.send({ code: 200, message: "account created successfully." });
                        }
                    });
                }
            });
        }
    }
    else {
        res.send({ code: 1010, message: "Invalid email or phone." });
    }
});

module.exports = router;