const token = require("../middlewares/auth")
const database = require("../models")
const jwt = require("jsonwebtoken")

//add a comment
exports.createComment = async (req, res) => {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    if (req.body.content === "") {
        return res.status(401).json({ error: "Veuillez remplir le champs" });
    } else {
        database.Comment.create({
            postId: req.params.id,
            userId: userId,
            content: req.body.content,
        })
        .then((response) => res.status(201).json({ message: "Commentaire ajouté !", comment: response }))
        .catch((error) => res.status(400).json({ error }));
    }
}

//delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const userId = token.getUserId(req)
        const checkAdmin = await database.User.findOne({ where: { id: userId } })
        const comment = await database.Comment.findOne({
            where: { id: req.params.id },
        })

        if (userId === comment.userId || checkAdmin.isAdmin === true) {
            database.Comment.destroy(
                { where: { id: req.params.id } },
                { truncate: true }
            )
            res.status(200).json({ message: "commentaire supprimé" })
        } else {
            res.status(401).json({ message: "Vous n'êtes pas autorisé" })
        }
    } catch (error) {
        return res.status(501).send({ error: "Erreur serveur" })
    }
}

//get all comments from a post
exports.getAllComments = (req, res) => {
    database.Comment.findAll({
        where: { postId: req.params.id }, include: [database.user],
        attributes: ["id", "post", "imageUrl", "createdAt"],
        order: [["createdAt", "DESC"]],
        include: [
            {
                model: database.User,
                attributes: ["pseudo", "id", "imageUrl", "isAdmin"],
            },
            {
                model: database.Like,
                attributes: ["userId"],
            },
            {
                model: database.Comment,
                attributes: ["post", "pseudo", "userId", "id"],
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: database.User,
                        attributes: ["imageUrl", "pseudo", "isAdmin"],
                    },
                ],
            },
        ],
    })
        .then((res) => res.status(200).send(comments))
        .catch((err) => err.status(500).send({ err: "erreur serveur " }))
} 