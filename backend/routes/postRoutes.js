const express = require('express');
const router = express.Router();

const postCtl = require("../controllers/post");
const auth = require("../middlewares/auth");
const multerPost = require("../middlewares/multer-config_feed")



router.get("/posts", auth, postCtl.allPost);
router.post("/posts", auth, multerPost, postCtl.createPost);
router.get("/posts/:id", auth, postCtl.onePost);
router.put("/posts/:id", auth, multerPost, postCtl.modifyPost);
router.delete("/posts/:id", auth, postCtl.deletePost);

module.exports = router;