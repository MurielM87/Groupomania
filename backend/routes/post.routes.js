const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controller');
const auth = require('../middleware/auth');

//publish - create a new post
router.post('/', auth, multer, postCtrl.createPost);
//modify a post
router.put('/:id', auth, multer, postCtrl.modifyPost);
//delete a post
router.delete('/:id', auth, multer, postCtrl.deletePost);
//get-select a post
router.get('/:id', auth, postCtrl.getOnePost);
//get-select all the posts
router.get('/', auth, postCtrl.getAllPosts);


module.exports = router;