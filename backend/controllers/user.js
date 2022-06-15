const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

//SIGNUP
exports.signup = (req, res, next) => {
    console.log('signup')
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      console.log(req)
    
      if (!/^[\w\d.+-]+@[\w.-]+\.[a-z]{2,}$/.test(req.body.email)) {
        return res.status(400).json({ error: "Email invalide" });
      }

      User.create({
        pseudo: req.body.pseudo,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      console.log('err', error)
      return res.status(500).json({ error })
    });
    
    
};

//LOGIN
exports.login = (req, res, next) => {
  console.log('login')
  if (!/^[\w\d.+-]+@[\w.-]+\.[a-z]{2,}$/.test(req.body.email)) {
    return res.status(400).json({ error : "Email invalide" });
  }

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};