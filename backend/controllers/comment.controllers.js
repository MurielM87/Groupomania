const Post = require('../models/comment.model');
const db = require('../config/DBconnection');

//create a comment
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const post = new Post ({
        ...postObject,
        
    });
    post.save()
        .then(() => {
           res.status(201).json({message : "commentaire ajouté"}) 
        }).catch((err) => {
            res.status(400).json({error})
        });
};

//delete a comment

//modify a comment

