const database = require("../models")

//like a post
exports.likePost = async (req, res) => {
    const userId = await database.User.findOne({
        where: { id: req.user.userId }
    })
    console.log("likePost||userId", userId.id)
    const postId = await database.Post.findOne({
        where: { id: req.params.id }
    })
    console.log("likePost||post", postId.id)
    if (!postId) {
        return res.status(404).send({ message: "post inconnu" })
    }
    
    let like = await database.Like.findOne({
        where: {
            UserId: userId.id,
            PostId: postId.id,
            isLike: true
        }
    });

    let dislike = await database.Dislike.findOne({
        where: {
            UserId: userId.id,
            PostId : postId.id,
            isDislike: true,
        }
    })
    if(!like && dislike) {
        return res.status(401).json({message: "pas possible"})
    } else if (!like && !dislike) {
        let newLike = await database.Like.create({
            UserId: userId.id,
            PostId: postId.id,
            isLike: true,
        });
        return res.json(newLike);
    } else {
        await database.Like.destroy({
            where: { id: like.id },

        });
        return res.json({ message: "delete like" });
    }
},


//dislike a post
exports.dislikePost= async (req, res) => {
    const userId = await database.User.findOne({
        where: { id: req.user.userId }
    })
    console.log("dislikePost||userId", userId.id)
    const postId = await database.Post.findOne({
        where: { id: req.params.id }
    })
    console.log("dislikePost||post", postId.id)
    if (!postId) {
        return res.status(404).send({ message: "post inconnu" })
    }
   
    let dislike = await database.Dislike.findOne({
        where: {
            UserId: userId.id,
            PostId: postId.id,
            isDislike: true,
        }
    });
    let like = await database.Like.findOne({
        where: {
            UserId: userId.id,
            PostId: postId.id,
            isLike: true
        }
    });
    if(like && !dislike) {
        return res.status(401).json({message: "pas possible"})
    } else if (!dislike && !like) {
        let newDislike = await database.Dislike.create({
            UserId: userId.id,
            PostId: postId.id,
            isDislike: true,
        });
        return res.json(newDislike);
    } else {
        await database.Dislike.destroy({
            where: { id: dislike.id },

        });
        return res.json({ message: "delete dislike" });
    }
}
