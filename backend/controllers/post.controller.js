const Post = require('../models/post.model');
const db = require('../config/DBconnection');

//create a post
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const post = new Post ({
        ...postObject,
        
    });
    post.save()
        .then(() => {
           res.status(201).json({message : "article créé"}) 
        }).catch((err) => {
            res.status(400).json({error})
        });
}