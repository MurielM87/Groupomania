const router = require("express").Router()
const postsCtrl = require("../controllers/post")
const auth = require("../middlewares/auth")
const multer = require("../middlewares/multer-config")

router.post("/add", auth, multer, postsCtrl.createPost)
router.get("/:id", auth, postsCtrl.getOnePost)
router.get("/", auth, postsCtrl.getAllPosts)
router.put("/:id", auth, multer, postsCtrl.updatePost)
router.delete("/:id", auth, multer, postsCtrl.deletePost)
router.post("/:id/like", auth, postsCtrl.likePost)
router.post("/:id/comments", auth, postsCtrl.addComment)
router.delete("/comments/:id", auth, postsCtrl.deleteComment)

module.exports = router