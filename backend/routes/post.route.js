const postCtrl = require('../controllers/post.controller');
const router = require('express').Router()

//create a new post
router.post('/createPost', postCtrl.createPost)
//modify a post
router.put('/:id', postCtrl.updatePost)
//delete a post
router.delete('/:id', postCtrl.deletePost)
//get-select a post
router.get('/:id', postCtrl.getOnePost)
//get-select all the posts
router.get('/allPost', postCtrl.getAllPosts)
//published post
router.get('/publishedPost', postCtrl.getPublishedPost)

module.exports = router