const cryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DBconnection = require('../config/DBconnection');
const User = require('../models/user.model');

const emailValidator = require('email-validator');
const { router } = require('../app');
const { DB } = require('../config/DBconnection');
//const passwordValidator = require ('password-validator');
/*
//creation schema validation password
const schema = new passwordValidator();
schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .has().symbols()
*/

//SIGN UP
exports.signup = (req, res) => {
    //cryptage email
    const hashEmail = cryptoJS.HmacSHA512(req.body.dataSignup.email, 'RANDOM_SECRET_EMAIL').toString();
    //cryptage password
    bcrypt.hash(req.body.dataSignup.password, 10)
        .then(hashPassword => {
            DBconnection.query('SELECT EMAIL FROM user WHERE email = !email', {replacements: {email: hashEmail}, type: DBconnection.QueryTypes.SELECT})
                .then(email => {
                    if(email !== email) {
                        res.status(400).json({error});
                    }
                DBconnection.query('INSERT INTO user(pseudo, firstname, lastname, email, password) VALUES (:pseudo, :firstname, :lastname, :email, :password)', {
                    replacements: {
                        pseudo: req.body.dataSignup.pseudo,
                        firstname: req.body.dataSignup.firstname,
                        lastname: req.body.dataSignup.lastname,
                        email: hashEmail,
                        password: hashPassword
                    },
                    type: DBconnection.QueryTypes.INSERT
                })
                .then(res => res.status(201).json({message: 'compte créé'}))
                .catch(() => res.status(400).json({error : "votre inscription n'a pas pu été faite"}))
                })
            .catch(() => res.status(400).json({error : "votre inscription a échouée"}))
        })


//        return res.redirect("/");
   
};

//LOG IN
exports.login = (req, res) => {
    //Cryptage email
    const hashEmail = cryptoJS.HmacSHA512(req.body.dataLogin.email, 'RANDOM_SECRET_EMAIL').toString();
    //verify if this email is already in the table user
    DBconnection.query('SELECT * FROM user WHERE email = :email', { replacements: { email: hashEmail }, type: DBconnection.QueryTypes.SELECT })
        .then(dataUser => {
            if (!dataUser) {
                res.status(400).json({ error });
            }
            // On compare le mot de passe envoyer avec celui enregistré
            bcrypt.compare(req.body.dataLogin.password, dataUser[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error });
                    }
                    res.status(200).json({
                        userId: dataUser[0].id,
                        token: jwt.sign(
                            { userId: dataUser[0].id },
                            process.env.TOKEN_SECRET
                        ),
                        name: dataUser[0].name,
                        email: req.body.dataLogin.email
                    })
                })
                .catch(() => res.status(501).json({ error: 'Connexion impossible' }));
        })
        .catch(() => res.status(500).json({ error: 'Connexion impossible' }));
}

exports.deleteProfil = (req, res) => {
    //delete the user with the id
    db.query('DELETE FROM user WHERE id = :id', { replacements: { id: req.body.user_id }, type: DBconnection.QueryTypes.DELETE })
        .then(() => {
            //delete the data with the user_id
            db.query('DELETE FROM post WHERE user_id = :user_id', { replacements: { userId: parseInt(req.body.user_id) }, type: DBconnection.QueryTypes.DELETE })
                .then(response => res.status(200).json({ response }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}
