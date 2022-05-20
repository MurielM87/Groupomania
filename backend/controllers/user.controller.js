const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {sequelize} = require('../DBconnection');
const User = require('../models/user.model');

const emailValidator = require('email-validator');
const passwordValidator = require ('password-validator');

//SIGN UP
exports.signup = (req, res, next) => {
    console.log("req", req);
    console.log("res", res);
    if (!emailValidator.validate(req.body.email)) {
        return res.status(400).json({ 'message': 'Adresse email non valide' });
       
    } else if (!schema.validate(req.body.password)) {
        return res.status(400).json({ 'message': 'Mot de passe non valide - Utilisez des majuscules, minuscules, chiffres et symboles, aucun espace, minimum 8 caractères.' });
    } else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: hash
                });
                //saving the user in the database
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }))
    } 
    console.log("password", password);
    console.log("email", email);
    console.log("firstname", firstName);
    console.log("lastname", lastName);
};

////LOG IN
//exports.login = (req, res, next) => {
//    User.findOne({ email: req.body.email })
//        .then(user => {
//            if (!user) {
//                return res.status(401).json({ error: 'utilisateur inconnu' });
//            }
//            bcrypt.compare(req.body.password, user.password)
//                .then(valid => {
//                    if (!valid) {
//                        return res.status(401).json({ error: 'mot de passe incorrect' });
//                    } res.status(200).json({
//                        userId: user._id,
//                        token: jwt.sign(
//                            { userId: user._id },
//                            process.env.TOKEN_SECRET,
//                            { expiresIn: '12h' }
//                        )
//                    });
//                })
//                .catch(error => res.status(500).json({ error }));
//        })
//        .catch(error => res.status(500).json({ error }));
//};