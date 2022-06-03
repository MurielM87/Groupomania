const { commments } = require('../models');
const db = require('../models');

//create Main Model
const User = db.users
const Post = db.posts
const Comment = db.comments

//create a comment
const createComment = async (req, res) => {
    let data = {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published ? req.body.published : false
    }

    const comment = await Comment.create(data)
    res.status(200).send(comment)
}

//update a comment
const updateComment = async (req, res) => {
    let id = req.params.id
    
    const comment = await Comment.update(req.body, {where: {id: id}})
    res.status(200).send(comment)
}

//delete a comment by id
const deleteComment = async (req, res) => {
    let id = req.params.id
    
    await Comment.destroy({where: {id: id}})
    res.status(200).send('comment deleted')
}

//get one comment
const getOneComment = async (req, res) => {
    let id = req.params.id
    let comment = await Comment.findOne({ where : {id: id}})
    res.status(200).send(comment)
}

//get all comments
const getAllComments = async (req, res) => {
    let comments = await Comment.findAll({})
    res.status(200).send(comments)
}

//get published comment
const getPublishedComment = async (req, res) => {
    const comments = await comments.findAll({where: {published: true}})
    res.status(200).send(comments)
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getOneComment,
    getAllComments,
    getPublishedComment
}