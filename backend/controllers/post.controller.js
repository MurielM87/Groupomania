const { posts } = require('../models');
const db = require('../models');

//create Main Model
const User = db.users
const Post = db.posts
const Comment = db.comments

//create a post
const createPost = async (req, res) => {
    let info = {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published ? req.body.published : false
    }

    const post = await Post.create(info)
    res.status(200).send(post)
}

//update a post
const updatePost = async (req, res) => {
    let id = req.params.id
    
    const post = await Post.update(req.body, {where: {id: id}})
    res.status(200).send(post)
}

//delete a post by id
const deletePost = async (req, res) => {
    let id = req.params.id
    
    await Post.destroy({where: {id: id}})
    res.status(200).send('post deleted')
}

//get one post
const getOnePost = async (req, res) => {
    let id = req.params.id
    let post = await Post.findOne({ where : {id: id}})
    res.status(200).send(post)
}

//get all posts
const getAllPosts = async (req, res) => {
    let posts = await Post.findAll({})
    res.status(200).send(posts)
}

//get published post
const getPublishedPost = async (req, res) => {
    const posts = await posts.findAll({where: {published: true}})
    res.status(200).send(posts)
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getOnePost,
    getAllPosts,
    getPublishedPost
}