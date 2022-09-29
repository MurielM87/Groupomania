const database = require("../models")
const fs = require("fs")

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
            PostId: postId.id
        }
    });
    if (!like) {
        let newLike = await database.Like.create({
            UserId: userId.id,
            PostId: postId.id
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
            PostId: postId.id
        }
    });
    if (!dislike) {
        let newDislike = await database.Dislike.create({
            UserId: userId.id,
            PostId: postId.id
        });
        return res.json(newDislike);
    } else {
        await database.Dislike.destroy({
            where: { id: dislike.id },

        });
        return res.json({ message: "delete dislike" });
    }
},

//love a post
exports.lovePost= async (req, res) => {
    const userId = await database.User.findOne({
        where: { id: req.user.userId }
    })
    console.log("lovePost||userId", userId.id)
    const postId = await database.Post.findOne({
        where: { id: req.params.id }
    })
    console.log("lovePost||post", postId.id)
    if (!postId) {
        return res.status(404).send({ message: "post inconnu" })
    }

    let love = await database.Love.findOne({
        where: {
            UserId: userId.id,
            PostId: postId.id
        }
    });
    if (!love) {
        let newLove = await database.Love.create({
            UserId: userId.id,
            PostId: postId.id
        });
        return res.json(newLove);
    } else {
        await database.Love.destroy({
            where: { id: love.id },

        });
        return res.json({ message: "delete love" });
    }
},

//funny for a post
exports.funnyPost = async (req, res) => {
    const userId = await database.User.findOne({
        where: { id: req.user.userId }
    })
    console.log("funnyPost||userId", userId.id)
    const postId = await database.Post.findOne({
        where: { id: req.params.id }
    })
    console.log("funnyPost||post", postId.id)
    if (!postId) {
        return res.status(404).send({ message: "post inconnu" })
    }

    let funny= await database.Funny.findOne({
        where: {
            UserId: userId.id,
            PostId: postId.id
        }
    });
    if (!funny) {
        let newFunny = await database.Funny.create({
            UserId: userId.id,
            PostId: postId.id
        });
        return res.json(newFunny);
    } else {
        await database.Funny.destroy({
            where: { id: funny.id },

        });
        return res.json({ message: "delete funny" });
    }
},

//interest to a post
exports.interestPost = async (req, res) => {
    const userId = await database.User.findOne({
        where: { id: req.user.userId }
    })
    console.log("interestPost||userId", userId.id)
    const postId = await database.Post.findOne({
        where: { id: req.params.id }
    })
    console.log("interestPost||post", postId.id)
    if (!postId) {
        return res.status(404).send({ message: "post inconnu" })
    }

    let interest = await database.Interest.findOne({
        where: {
            UserId: userId.id,
            PostId: postId.id
        }
    });
    if (!interest) {
        let newInterest = await database.Interest.create({
            UserId: userId.id,
            PostId: postId.id
        });
        return res.json(newInterest);
    } else {
        await database.Interest.destroy({
            where: { id: interest.id },

        });
        return res.json({ message: "delete interest" });
    }
},

//support to a post
exports.supportPost= async (req, res) => {
    const userId = await database.User.findOne({
        where: { id: req.user.userId }
    })
    console.log("supportPost||userId", userId.id)
    const postId = await database.Post.findOne({
        where: { id: req.params.id }
    })
    console.log("supportPost||post", postId.id)
    if (!postId) {
        return res.status(404).send({ message: "post inconnu" })
    }

    let support = await database.Support.findOne({
        where: {
            UserId: userId.id,
            PostId: postId.id
        }
    });
    if (!support) {
        let newSupport = await database.Support.create({
            UserId: userId.id,
            PostId: postId.id
        });
        return res.json(newSupport);
    } else {
        await database.Support.destroy({
            where: { id: support.id },

        });
        return res.json({ message: "delete support" });
    }
}
