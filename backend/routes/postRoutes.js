const express = require('express');
const router = express.Router();
const multer = require('multer');

const postCtrl = require("../controllers/post");
const auth = require("../middlewares/auth");


router.post("/post", auth, multer, postCtrl.createPost);
router.put("/post/:id", auth, multer, postCtrl.modifyPost);
router.delete("/post/:id", auth, multer, postCtrl.deletePost);
router.get("/post/:id", auth, postCtrl.onePost);
router.get("/posts", auth, postCtrl.allPost);

module.exports = router;