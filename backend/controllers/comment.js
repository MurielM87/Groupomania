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
            database.Comment.create({
                PostId: post.id,
                UserId: userId.id,
                content: req.body.content,
            })
            .then((response) => res.status(201).json({ message: "Commentaire ajouté !", comment: response }))
            .catch((error) => res.status(400).json({ error: "Erreur, votre commentaire n'a pas pu être publié" }));
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
            res.status(200).json({ message: "commentaire supprimé" })
        } else {
            res.status(401).json({ message: "Vous n'avez pas l'autorisation" })
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" })
    }
}
