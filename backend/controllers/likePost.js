const { Like } = require('../models/index.js');
const { User } = require('../models/index.js');


exports.likePost = (req, res) => {
    try {
        console.log(req.body);
        Like.create({
            like: req.body.like, 
            PostId: req.body.PostId, 
            UserId: req.body.UserId
        })
            .then(newLike => {
                console.log("nouveau like créé");
                res.status(201).json(newLike);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }  
};

/* logique pour unliker un post */
exports.unlikePost = (req, res) => {
    console.log(req.body)
    try {
        Like.destroy({ 
            where: {
                PostId: req.params.PostId,
                UserId: req.body.UserId}})
            .then(like => {
                console.log(like);
                res.status(200);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

//get all likes for a post
exports.getAllLikesPost = (req, res) => {
    try {
        Like.findAll({
            where: { 
                PostId: req.params.PostId
            }, 
            include: User
        })
            .then(like => {
                res.status(200).json(like);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};