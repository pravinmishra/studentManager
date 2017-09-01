var express = require('express');
var router = express.Router();
var joi = require('joi');
var extension = require('joi-date-extensions');
var joiDate = joi.extend(extension);
var mysqlConnection = require('../connection');

router.post('/', function (req, res) {
    const studentSchema = joi.object().keys({
        name: joi.string().required(),
        DOB: joiDate.date().format('DD-MM-YYYY').required(),
        school: joi.string().required(),
        class: joi.number().required(),
        division: joi.string().required(),
        status: joi.string().required()
    });
    var validationData = {
        name: req.body.name,
        DOB: req.body.DOB,
        school: req.body.school,
        class: req.body.class,
        division: req.body.division,
        status: req.body.status
    }
    joi.validate(validationData, studentSchema, function (err, value) {
        if (err) {
            res.send({ code: 1051, message: "Error:" + err });
        }
        else {
            var yearDOB = new Date(validationData.DOB);
            yearDOB = yearDOB.getFullYear();
            var currDate = new Date();
            var currentYear = currDate.getFullYear();
            var age = currentYear - yearDOB;
            var birthDate = validationData.DOB;
            birthDate = new Date(birthDate);
            birthDate = formatDate(birthDate);
            console.log(yearDOB, currentYear, age, birthDate, new Date());
            // res.send({ code: 200, message: "Student added successfully." });            
            if (age > 3) {
                addStudentQuery = "insert into student values(?,?,?,?,?,?,?,?)";
                addStudentQueryParams = [null, validationData.name, birthDate, age,
                    validationData.school, validationData.class, validationData.division, validationData.status];
                console.log("addStudentQueryParams", addStudentQueryParams);
                mysqlConnection.query(addStudentQuery, addStudentQueryParams, function (error, results) {
                    if (error) {
                        res.send({ Error: error });
                    }
                    else {
                        console.log("results", results);
                        res.send({ code: 200, message: "Student added successfully." });
                    }
                });
            }
            else {
                res.send({ code: 1052, message: "Date of birth should be atleast 3 years ago." });
            }
        }
    });
});

router.put('/', function (req, res) {
    const studentSchema = joi.object().keys({
        id: joi.string().required(),
        name: joi.string().required(),
        DOB: joiDate.date().format('DD-MM-YYYY').required(),
        school: joi.string().required(),
        class: joi.number().required(),
        division: joi.string().required(),
        status: joi.string().required()
    });
    var validationData = {
        id: req.body.id,
        name: req.body.name,
        DOB: req.body.DOB,
        school: req.body.school,
        class: req.body.class,
        division: req.body.division,
        status: req.body.status
    }
    joi.validate(validationData, studentSchema, function (err, value) {
        if (err) {
            res.send({ code: 1051, message: "Error:" + err });
        }
        else {
            var yearDOB = new Date(validationData.DOB);
            yearDOB = yearDOB.getFullYear();
            var currDate = new Date();
            var currentYear = currDate.getFullYear();
            var age = currentYear - yearDOB;
            var birthDate = validationData.DOB;
            birthDate = new Date(birthDate);
            birthDate = formatDate(birthDate);
            console.log(yearDOB, currentYear, age, birthDate, new Date());
            // res.send({ code: 200, message: "Student added successfully." });            
            if (age > 3) {
                editStudentQuery = "update student set Name = ?, DOB = ?,Age = ?, school = ?, class = ?,  DIVISION = ?, studentStatus = ? where id = ?";
                editStudentQueryParams = [validationData.name, birthDate, age,
                validationData.school, validationData.class, validationData.division, validationData.status, validationData.id];
                console.log("editStudentQueryParams", editStudentQueryParams);
                mysqlConnection.query(editStudentQuery, editStudentQueryParams, function (error, results) {
                    if (error) {
                        res.send({ Error: error });
                    }
                    else {
                        console.log("results", results);
                        res.send({ code: 200, message: "Student details updated successfully successfully." });
                    }
                });
            }
            else {
                res.send({ code: 1052, message: "Date of birth should be atleast 3 years ago." });
            }
        }
    });
});


router.get('/', function (req, res) {
    var pageCount;
    var numberOfPage;
    const studentSchema = joi.object().keys({
        pageNumber: joi.number().required(),
    });
    var validationData = {
        pageNumber: req.query.pageNumber
    }
    joi.validate(validationData, studentSchema, function (err, value) {
        if (err) {
            res.send({ code: 1051, message: "Error:" + err });
        }
        else {
            countQuery = "select count(*) as pageCount from (select * from student) as t";
            mysqlConnection.query(countQuery, function (error, results) {
                if (error) {
                    res.send({ Error: error });
                }
                else {
                    console.log("results", results[0].pageCount);
                    pageCount = results[0].pageCount;
                    numberOfPage = pageCount / 5;
                    getStudentQuery = 'select * from student LIMIT ? OFFSET ?';
                    getStudentQueryParams = [5, 5 * validationData.pageNumber];
                    mysqlConnection.query(getStudentQuery, getStudentQueryParams, function (error, results) {
                        if (error) {
                            res.send({ Error: error });
                        }
                        else {
                            if (results.length > 0) {
                                res.send({
                                    code: 200,
                                    message: "Student list returned successfully.",
                                    data: results,
                                    numberOfPage: numberOfPage
                                });
                            }
                            else {
                                res.send({
                                    code: 1057,
                                    message: "No data found.",
                                });
                            }
                        }
                    });
                }
            });
        }
    });
});

router.get('/one', function (req, res) {
    const studentSchema = joi.object().keys({
        id: joi.number().required(),
    });
    var validationData = {
        id: req.query.id
    }
    joi.validate(validationData, studentSchema, function (err, value) {
        if (err) {
            res.send({ code: 1051, message: "Error:" + err });
        }
        else {
            getSingleQuery = 'select * from student where id = ?';
            getSingleQueryParams = [validationData.id];
            mysqlConnection.query(getSingleQuery, getSingleQueryParams, function (error, results) {
                if (error) {
                    res.send({ Error: error });
                }
                else {
                    if (results.length > 0) {
                        res.send({
                            code: 200,
                            message: "Student details returned successfully.",
                            data: results
                        });
                    }
                    else {
                        res.send({
                            code: 1056,
                            message: "Student details not found.",
                            data: results
                        });
                    }
                }
            });
        }
    });
});

router.delete('/', function (req, res) {
    // var tokenValid = validateToken(auth_token);
    // console.log("tokenValid",tokenValid,validateToken(auth_token));
    // if (tokenValid) {
    //     res.send({
    //         code: 200,
    //         message: "authorised.",
    //     });
    // }
    // else {
    //     res.send({
    //         code: 200,
    //         message: "unauthorised.",
    //     });
    // }

    const studentSchema = joi.object().keys({
        id: joi.number().required(),
    });
    var validationData = {
        id: req.body.id
    }
    joi.validate(validationData, studentSchema, function (err, value) {
        if (err) {
            res.send({ code: 1051, message: "Error:" + err });
        }
        else {
            deleteQuery = "delete from student where id = ?";
            deleteQueryParams = [validationData.id];
            mysqlConnection.query(deleteQuery, deleteQueryParams, function (error, results) {
                if (error) {
                    res.send({ Error: error });
                }
                else {
                    console.log("results", results);
                    if (results.affectedRows > 0) {
                        res.send({
                            code: 200,
                            message: "Student deleted successfully.",
                        });
                    }
                    else {
                        res.send({
                            code: 1054,
                            message: "Student with id = " + validationData.id + " does not exist.",
                        });
                    }
                }
            });
        }
    });
});


//function formats date
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = router;