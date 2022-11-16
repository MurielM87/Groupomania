const database = require("../models")

//add a comment
exports.createComment = async (req, res) => {
    const userId = await database.User.findOne({
        where: { id: req.user.userId }
    })
    const post = await database.Post.findOne({
        where: { id: req.params.id }
    })

    if (userId !== null && post !== null) {
        console.log("comment||req.body", req.body)
        if (req.body.content === "") {
            return res.status(401).json({ error: "Veuillez remplir le champs" });
        } else {
            console.log('post.id', post.id)
            console.log('userId.id', userId.id)
            console.log('req.body', req.body)
            database.Comment.create({
                PostId: post.id,
                UserId: userId.id,
                content: req.body.comment.content,
            })

            let newPost = await database.Post.findOne({
                where: { id: req.body.comment.postId },
                attributes: ["id", "title", "content", "imageUrl", "createdAt", "updatedAt"],
                order: [["createdAt", "DESC"]],
                include: [
                  {
                    model: database.User,
                    attributes: ["id", "pseudo", "imageUrl", "isAdmin"],
                  },
                  {
                    model: database.Like,
                    attributes: ["id", "userId", "postId"],
                    include: [
                      {
                        model: database.User,
                        attributes: ["id", "pseudo", "imageUrl", "isAdmin"],
                      }
                    ],
                  },
                  {
                    model: database.Dislike,
                    attributes: ["id", "userId", "postId"],
                    include: [
                      {
                        model: database.User,
                        attributes: ["id", "pseudo", "imageUrl", "isAdmin"],
                      }
                    ],
                  },
                  {
                    model: database.Comment,
                    order: [["createdAt", "DESC"]],
                    attributes: ["id", "content", "postId", "userId", "createdAt"],
                    include: [
                      {
                        model: database.User,
                        attributes: ["id", "pseudo", "imageUrl", "isAdmin"],
                      }
                    ],
                  },
                ],
              })
              console.log("POST.ID", post.id)

            res.status(201).json({ message: "Commentaire ajouté !", post: newPost })
           
        }
    } else {
        res.status(500).send({ error })
    } 
}

//delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const userId = await database.User.findOne({
            where: { id: req.user.userId }
        })
        const comment = await database.Comment.findOne({
            where: { id: req.params.id },
        })
                
        if (userId.id === comment.UserId || userId.isAdmin === true) {
            database.Comment.destroy(
                { where: { id: req.params.id } },
                { truncate: true }
            )
console.log("DELETECOMMENT||req.params.id", req.params)
console.log("DELETECOMMENT||req.body", req.body)
            //renvoyer getOnePost
            let newPost = database.Post.findOne({
                where: { id: req.body.comment.postId },
                attributes: ["id", "title", "content", "imageUrl", "createdAt", "updatedAt"],
                order: [["createdAt", "DESC"]],
                include: [
                  {
                    model: database.User,
                    attributes: ["id", "pseudo", "imageUrl", "isAdmin"],
                  },
                  {
                    model: database.Like,
                    attributes: ["id", "userId", "postId"],
                    include: [
                      {
                        model: database.User,
                        attributes: ["id", "pseudo", "imageUrl", "isAdmin"],
                      }
                    ],
                  },
                  {
                    model: database.Dislike,
                    attributes: ["id", "userId", "postId"],
                    include: [
                      {
                        model: database.User,
                        attributes: ["id", "pseudo", "imageUrl", "isAdmin"],
                      }
                    ],
                  },
                  {
                    model: database.Comment,
                    order: [["createdAt", "DESC"]],
                    attributes: ["id", "content", "postId", "userId", "createdAt"],
                    include: [
                      {
                        model: database.User,
                        attributes: ["id", "pseudo", "imageUrl", "isAdmin"],
                      }
                    ],
                  },
                ],
              })
              console.log("POST.ID", post.id)

            res.status(200).json({ message: "commentaire supprimé", error : 1, posts: newPost })
        } else {
            res.status(401).json({ message: "Vous n'avez pas l'autorisation" })
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" })
    }
}
