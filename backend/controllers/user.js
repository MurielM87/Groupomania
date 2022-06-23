const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const database = require("../models")
const token = require("../middlewares/token")
const fs = require("fs")
require("dotenv").config()

//SignUp
exports.signup = async (req, res) => {
  console.log('signup')
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
        if (!valid) {
          return res.status(401).json({ error: 'mot de passe incorrect' });
        } res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            { userId: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: '12h' }
          )
        });
      })

  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//Get One User
exports.getOneUser = async (req, res) => {
  try {
    // try to find this user by his ID
    const user = await database.User.findOne({
      where: { id: req.params.id },
    })
    res.status(200).send(user)
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//Update User
exports.updateUser = async (req, res) => {
  const id = req.params.id
  try {
    const userId = token.getUserId(req)
    let newImage
    let user = await database.User.findOne({ where: { id: id } })
    if (userId === user.id) {
      if (req.file && user.imageUrl) {
        newImage = `${req.protocol}://${req.get("host")}/upload/${req.file.filename
          }`
        const filename = user.imageUrl.split("/upload")[1]
        fs.unlink(`upload/${filename}`, (err) => {
          if (err) console.log(err)
          else {
            console.log(`Deleted file: upload/${filename}`)
          }
        })
      } else if (req.file) {
        newImage = `${req.protocol}://${req.get("host")}/upload/${req.file.filename
          }`
      }
      if (newImage) {
        user.imageUrl = newImage
      }
      if (req.body.pseudo) {
        user.pseudo= req.body.pseudo
      }
      if (req.body.firstname) {
        user.firstname= req.body.firstname
      }
      if (req.body.lastname) {
        user.lastname= req.body.lastname
      }
      const newUser = await user.save({ fields: ["pseudo", "firstname", "lastname", "imageUrl"] }) //
      res.status(200).json({
        user: newUser,
        message: "Votre profil a bien été modifié",
      })
    } else {
      res
        .status(401)
        .json({ message: "Vous n'êtes pas autorisé" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//Delete User
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await database.User.findOne({ where: { id: id } })
    if (user !== null) {
      const filename = user.imageUrl.split("/upload")[1]
      fs.unlink(`upload/${filename}`, () => {
        database.User.destroy({ where: { id: id } })
        res.status(200).json({ message: "utilisateur supprimé" })
      })
    } else {
      database.User.destroy({ where: { id: id } })
      res.status(200).json({ message: "utilisateur supprimé" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}