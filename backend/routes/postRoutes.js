const router = require("express").Router()
const postCtrl = require("../controllers/post")
const likeCtrl = require("../controllers/likes")
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
router.post("/:id/like", auth, likeCtrl.likePost)
router.post("/:id/dislike", auth, likeCtrl.dislikePost)
router.post("/:id/love", auth, likeCtrl.lovePost)
router.post("/:id/funny", auth, likeCtrl.funnyPost)
router.post("/:id/interest", auth, likeCtrl.interestPost)
router.post("/:id/support", auth, likeCtrl.supportPost)

//comments
router.post("/:id/comment", auth, commentCtrl.createComment)
router.delete("/comment/:id", auth, commentCtrl.deleteComment)

module.exports = router