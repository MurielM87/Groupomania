const Database = require("../models")
const bcrypt = require("bcrypt")

function createAdmin(req, res) {
  // check if an admin account already exists
  Database.User.findOne({
    where: { email: process.env.ADMIN_EMAIL } || { pseudo: process.env.ADMIN_PSEUDO },
  })
    .then((user) => {
      // if not create one
      if (!user) {
        bcrypt
          .hash(process.env.ADMIN_PASSWORD, 10)
          .then((hash) => {
            const admin = Database.User.create({
              pseudo: process.env.ADMIN_PSEUDO,
              email: process.env.ADMIN_EMAIL,
              password: hash,
              isAdmin: true,
            })
              .then((admin) => {
                console.log({
                  admin,
                  message: `le compte administrateur est créé !`,
                })
              })
              .catch((error) => {
                res.status(400).json({ error })
              })
          })
          .catch((error) => {
            res.status(500).send({ error })
          })
      } else {
        console.log({ message: "le compte administrateur existe déjà !" })
      }
    })
    .catch((error) => {
      console.log({ error })
    })
}
module.exports = createAdmin()