const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment.controller');
const auth = require('../middleware/auth');

//publish - create a new comment
router.post('/', auth, multer, commentCtrl.createComment);
//modify a comment
router.put('/:id', auth, multer, commentCtrl.modifyComment);
//delete a comment
router.delete('/:id', auth, multer, commentCtrl.deleteComment);


module.exports = router;
