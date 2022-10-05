const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const database = require("../models")
const fs = require("fs")
const { sequelize } = require("../models")
require("dotenv").config()

//SignUp
exports.signup = async (req, res) => {
  try {
    const user = await database.User.findOne({
      where: { email: req.body.email },
    })
    if (user !== null) {
      if (user.pseudo === req.body.pseudo) {
        return res.status(400).json({ error: "ce pseudo est déjà utilisé" })
      }
    } else {
      const hash = await bcrypt.hash(req.body.password, 10)
      const newUser = await database.User.create({
        pseudo: req.body.pseudo,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        isAdmin: false,
      })
      res.status(201).send({
        user: newUser,
        message: `Votre compte est créé !`,
      })
    }
  } catch (error) {
    res.status(400).json({ message: "Cet email est déjà utilisé", error })
  }
}


//LogIn
exports.login = async (req, res) => {
  try {
    const user = await database.User.findOne({
      where: { email: req.body.email },
    })
    if (!user) {
      return res.status(403).send({ error: "utilisateur inconnu" })
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        const token = jwt.sign(
          { userId: user.id },
          process.env.TOKEN,
          { expiresIn: '1h' }
        )
      
        if (!valid) {
          return res.status(401).json({ error: 'mot de passe incorrect' });
        } return res.cookie("token", token, {sameSite: `strict`}).status(200).json({
          userId: user.id, token   
        }); 
      }) 

  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//Get One User
exports.getOneUser = async (req, res) => {
  const id = req.params.id
  try {
    // try to find a user by Id
    const user = await database.User.findOne({
      where: { id: req.params.id },
    })
    res.status(200).send(user)
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//get All Users
exports.getAllUsers = async (req, res) => {
  try {
    // get all users from database
    const users = await database.User.findAll({
      attributes: ["id", "pseudo", "firstname", "lastname", "email", "imageUrl"],
      order: sequelize.random(),
    })
    res.status(200).send(users)
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//update User
exports.updateUser = async (req, res) => {
  const id = req.params.id
  
    let imageUrl
    let user = await database.User.findOne({ where: { id: id } })
    if (user) {
      if (req.file && user.imageUrl) {
      imageUrl = req.file.filename
        const filename = user.imageUrl.split("/images")[1]
        fs.unlink(`images/${filename}`, (err) => {
          if (err) console.log(err)
          else {
            console.log(`Deleted file: images/${filename}`)
          }
        })
      } else if (req.file) {
        imageUrl = req.file.filename
      }
      if (imageUrl) {
        user.imageUrl = imageUrl
      }
      if (req.body.pseudo) {
        user.pseudo = req.body.pseudo
      }
      if (req.body.firstname) {
        user.firstname = req.body.firstname
      }
      if (req.body.lastname) {
        user.lastname = req.body.lastname
      }
      const newUser = await user.save({ fields: ["pseudo", "firstname", "lastname", "imageUrl"] }) 
      res.status(200).json({
        user: newUser,
        message: "Votre profil a bien été modifié",
      })
    } else {
      res
        .status(401)
        .json({ message: "Vous n'êtes pas autorisé" })
    }
}

//delete User
exports.deleteUser = async (req, res) => {
    const userId = await database.User.findOne({
      where : {id : req.user.userId}
    })

    if (userId.id === userId.id || userId.isAdmin === true) {
      const filename = userId.imageUrl.split("/images")[1]
      fs.unlink(`images/${filename}`, () => {
        database.User.destroy({ where: { id: userId.id } })
        res.status(200).json({ message: "utilisateur supprimé" })
      })
    } else {
      database.User.destroy({ where: { id: userId.id } })
      res.status(200).json({ message: "utilisateur supprimé" })
    }
}

