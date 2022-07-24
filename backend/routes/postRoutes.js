const router = require("express").Router()
const postCtrl = require("../controllers/post")
const auth = require("../middlewares/auth")
const multer = require("../middlewares/multer-config")

router.post("/add", auth, multer, postCtrl.createPost)
router.get("/:id", auth, postCtrl.getOnePost)
router.get("/", auth, postCtrl.getAllPosts)
router.put("/:id", auth, multer, postCtrl.updatePost)
router.delete("/:id", auth, multer, postCtrl.deletePost)
router.post("/:id/like", auth, postCtrl.likePost)
router.post("/:id/comment", auth, postCtrl.addComment)
router.get("/comments", auth, postCtrl.getAllComments)
router.delete("/comment/:id", auth, postCtrl.deleteComment)

module.exports = router