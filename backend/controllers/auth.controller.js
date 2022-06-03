const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../config/DBconnection');
const User = require('../models/user.model');

const emailValidator = require('email-validator');
const { router } = require('../app');
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
    const user = {
            pseudo: req.body.pseudo,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };
        console.log('user', user);

        if (pseudo == null || firstname == null || lastname == null || email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

//faire verifs

        models.User.findOne({
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                    const newUser = models.User.create({
                        pseudo: pseudo,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: bcryptedPassword,
                        isAdmin: 0
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id 
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({'error' : 'cannot add user'})
                    })
                });
            } else {
                return res.status(409).json({'error' : 'user already exist'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({'error' : 'unable to verify user'});
        })

        

        return res.redirect("/");
   
};

//LOG IN
exports.login = (req, res, next) => {

};


