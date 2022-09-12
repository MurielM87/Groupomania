const router = require("express").Router()
const postCtrl = require("../controllers/post")
const commentCtrl = require("../controllers/comment")
const auth = require("../middlewares/auth")
const multer = require("../middlewares/multer-config")

//posts
router.post("/add", auth, multer, postCtrl.createPost)
router.get("/:id", auth, postCtrl.getOnePost)
router.get("/", auth, postCtrl.getAllPosts)
router.get("/user/:id", auth, postCtrl.getAllPostsOfOneUser)
router.put("/:id", auth, multer, postCtrl.updatePost)
router.delete("/:id", auth, multer, postCtrl.deletePost)

//like
router.post("/:id/like", auth, postCtrl.likePost)

//comments
router.post("/:id/comment", auth, commentCtrl.createComment)
router.get("/comments", auth, commentCtrl.getAllComments)
router.delete("/comment/:id", auth, commentCtrl.deleteComment)

module.exports = router