const router = require("express").Router()
const userCtrl = require("../controllers/user")
const auth = require("../middlewares/auth")
const multer = require("../middlewares/multer-config")

router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.put("/profile/:id", auth, multer, userCtrl.updateUser)
router.get("/profile/:id", auth, userCtrl.getOneUser)
router.delete("/profile/:id", auth, multer, userCtrl.deleteUser)

module.exports = router