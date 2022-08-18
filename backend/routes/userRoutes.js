const router = require("express").Router()
const userCtrl = require("../controllers/user")
const auth = require("../middlewares/auth")
const multer = require("../middlewares/multer-config")

router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.put("/profil/:id/edit", auth, multer, userCtrl.updateUser)
router.get("/profil/:id", auth, userCtrl.getOneUser)
router.get("/", auth, multer, userCtrl.getAllUsers)
router.delete("/profil/:id", auth, multer, userCtrl.deleteUser)

module.exports = router