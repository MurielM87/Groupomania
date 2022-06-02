const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../config/DBconnection');
const User = require('../models/user.model');

const emailValidator = require('email-validator');
//const passwordValidator = require ('password-validator');
/*
//creation schema validation password
const schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(16)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .has().symbols()
*/

//SIGN UP
exports.signup = (req, res, next) => {
    console.log(req.body)

    //create a new user
    try {
        let user = {
            pseudo: req.body.pseudo,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            createdAt: Date.now()
        };
        console.log('user', user);
        return res.redirect("/");
    } catch (e) {
        console.log(e);
    }



};

//LOG IN
exports.login = (req, res, next) => {

};