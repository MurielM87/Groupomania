const commentCtrl = require('../controllers/comment.controller');
const router = require('express').Router()

//create a new comment
router.post('/createComment', commentCtrl.createComment)
//modify a comment
router.put('/:id', commentCtrl.updateComment)
//delete a comment
router.delete('/:id', commentCtrl.deleteComment)
//get-select a comment
router.get('/:id', commentCtrl.getOneComment)
//get-select all the comments
router.get('/allComment', commentCtrl.getAllComments)
//published comment
router.get('/publishedComment', commentCtrl.getPublishedComment)

module.exports = router