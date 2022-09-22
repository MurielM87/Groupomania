const database = require("../models")

//add a comment
exports.createComment = async (req, res) => {
    const userId = await database.User.findOne({
        where: { id: req.user.userId }
    })
    console.log("CreateComment||userId", userId)
    const post = await database.Post.findOne({
        where: { id: req.params.id }
    })
    console.log("CreateComment||post", post)

    if (userId !== null && post !== null) {
        if (req.body.content === "") {
            return res.status(401).json({ error: "Veuillez remplir le champs" });
        } else {
            database.Comment.create({
                PostId: post.id,
                UserId: userId.id,
                content: req.body.content,
            })
            .then((response) => res.status(201).json({ message: "Commentaire ajouté !", comment: response }))
            console.log("arrivé ici")
            console.log(post)
            console.log(userId)
            console.log(req.body.content)
           // .catch((error) => res.status(400).json({ error }));
        }
    } else {
        res.status(400).send({ error: "Erreur, votre commentaire n'a pas pu être publié" })
    } 
}

//delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const userId = await database.User.findOne({
            where: { id: req.user.userId }
        })
        console.log("DeleteComment||userId", userId)
        const comment = await database.Comment.findOne({
            where: { id: req.params.id },
        })
        console.log("deleteComment||comment", comment)

        if (userId === comment.UserId || userId.isAdmin === true) {
            database.Comment.destroy(
                { where: { id: req.params.id } },
                { truncate: true }
            )
            res.status(200).json({ message: "commentaire supprimé" })
        } else {
            res.status(401).json({ message: "Vous n'avez pas l'autorisation" })
        }
    } catch (error) {
        return res.status(501).send({ error: "Erreur serveur" })
    }
}
