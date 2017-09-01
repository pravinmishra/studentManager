var express = require('express');
var router = express.Router();
var mysqlConnection = require('../connection');
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");

router.post('/',function(req,res){
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
        //if user login using email
        if (re.test(email)) {
            checkUserEmailQuery = 'select * from users where email = ?';
            checkUserEmailQueryParams = [email];
            mysqlConnection.query(checkUserEmailQuery, checkUserEmailQueryParams, function (errror, results) {
                if (errror) {
                    console.log("errror in exist",errror);
                    res.send({ Error: errror });
                }
                if (results.length > 0) {
                    if(bcrypt.compareSync(password, results[0].userPassword)){
                        loginEmailQuery = "insert into sessions values(?)";
                        var token = randomstring.generate();
                        loginEmailQueryParams = [token];
                        mysqlConnection.query(loginEmailQuery, loginEmailQueryParams, function (error, results) {
                            if (error) {
                                console.log("error in login email",error);
                                res.send({ Error: errror });
                            }
                            else {
                                res.send({ code: 200, message: "login successful.",
                            token: token});
                            }
                        });
                    }
                    else{
                        res.send({ code: 2001, message: "Incorrect email/phone or password." });                                            
                    }

                }
                else {                    
                    res.send({ code: 2001, message: "Incorrect email/phone or password." });                    
                }
            });
        }
        //if user login using phone
        if (email.match(pn)) {
            checkUserPhoneQuery = 'select * from users where phoneNumber = ?';
            checkUserPhoneQueryParams = [email];
            mysqlConnection.query(checkUserPhoneQuery, checkUserPhoneQueryParams, function (errror, results) {
                if (errror) {
                    console.log("errror in exist",errror);
                    res.send({ Error: errror });
                }
                if (results.length > 0) {
                    if(bcrypt.compareSync(password, results[0].userPassword)){
                        loginPhoneQuery = "insert into sessions values(?)";
                        var tokenP = randomstring.generate();
                        loginPhoneQueryParams = [tokenP];
                        mysqlConnection.query(loginPhoneQuery, loginPhoneQueryParams, function (error, results) {
                            if (error) {
                                console.log("error in login email",error);
                                res.send({ Error: errror });
                            }
                            else {
                                res.send({ code: 200, message: "login successful.",
                            token: tokenP});
                            }
                        });
                    }
                    else{
                        res.send({ code: 2001, message: "Incorrect email/phone or password." });                                            
                    }

                }
                else {                    
                    res.send({ code: 2001, message: "Incorrect email/phone or password." });                    
                }
            });
        }                
    }
    else {
        res.send({ code: 1010, message: "Invalid email or phone." });
    }    
});

module.exports = router;