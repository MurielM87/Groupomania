const token = require("../middlewares/token") 
const MyDatabase = require("../models") 
const fs = require("fs") 

//create a post
exports.createPost = async (req, res) => {
  const userId = token.getUserId(req)
  let imageUrl
  try {
    // try to find this user by his Id
    const user = await MyDatabase.User.findOne({
      attributes: ["username", "id", "avatar"],
      where: { id: userId },
    })
    // if ok get the file in the request
    if (user !== null) {
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`
      } else {
        imageUrl = null
      }
      // create this post in database
      const post = await MyDatabase.Post.create({
        include: [
          {
            model: MyDatabase.User,
            attributes: ["username", "avatar", "id"],
          },
        ],
        message: req.body.message,
        link: req.body.link,
        imageUrl: imageUrl,
        UserId: user.id,
      })

      res
        .status(201)
        .json({ post: post, messageRetour: "Votre post est ajouté" })
    } else {
      res.status(400).send({ error: "Erreur " })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//get a post
exports.getOnePost = async (req, res) => {
  try {
    // try to find this user by his Id
    const post = await MyDatabase.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: MyDatabase.User,
          attributes: ["username", "avatar", "id"],
        },
        {
          model: MyDatabase.Like,
          attributes: ["PostId", "UserId"],
        },
        {
          model: MyDatabase.Comment,
          order: [["createdAt", "DESC"]],
          attributes: ["message", "username", "UserId"],
          include: [
            {
              model: MyDatabase.User,
              attributes: ["avatar", "username"],
            },
          ],
        },
      ],
    })
    // Added every data needed for front
    res.status(200).json(post)
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // get all posts from database
    const posts = await MyDatabase.Post.findAll({
      attributes: ["id", "post", "imageUrl", "createdAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: MyDatabase.User,
          attributes: ["pseudo", "id", "imageUrl", "isAdmin"],
        },
        {
          model: MyDatabase.Like,
          attributes: ["UserId"],
        },
        {
          model: MyDatabase.Comment,
          attributes: ["post", "pseudo", "UserId", "id"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: MyDatabase.User,
              attributes: ["imageUrl", "pseudo", "isAdmin"],
            },
          ],
        },
      ],
    }) // Added every data needed for front + order we want
    res.status(200).send(posts)
  } catch (error) {
    return res.status(500).send({
      error: "erreur server ",
    })
  }
}

//update a post
exports.updatePost = async (req, res) => {
  try {
    // try to find this post by his Id
    let newImageUrl
    const userId = token.getUserId(req)
    let post = await MyDatabase.Post.findOne({ where: { id: req.params.id } })
    // Make sure this user is the owner
    if (userId === post.UserId) {
      // if a file is in the request
      if (req.file) {
        newImageUrl = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`
        // if an image was already in database
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/upload")[1]
          // delete it from the "upload" file
          fs.unlink(`upload/${filename}`, (err) => {
            if (err) console.log(err)
            else {
              console.log(`Deleted file: upload/${filename}`)
            }
          })
        }
      } // if a new message is in the request
      if (req.body.post) {
        post.post = req.body.post
      } 
      post.imageUrl = newImageUrl
      //save in database
      const newPost = await post.save({
        fields: ["post", "imageUrl"],
      })
      res.status(200).json({ newPost: newPost, messageRetour: "post modifié" })
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//delete a post
exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserId(req)
    const checkIfAdmin = await MyDatabase.User.findOne({
      where: { id: userId },
    })
    const post = await MyDatabase.Post.findOne({ where: { id: req.params.id } })
    if (userId === post.UserId || checkIfAdmin.isAdmin === true) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/upload")[1]
        fs.unlink(`upload/${filename}`, () => {
          MyDatabase.Post.destroy({ where: { id: post.id } })
          res.status(200).json({ message: "Post supprimé" })
        })
      } else {
        MyDatabase.Post.destroy({ where: { id: post.id } }, { truncate: true })
        res.status(200).json({ message: "Post supprimé" })
      }
    } else {
      res.status(401).json({ message: "Vous n'avez pas les droits requis" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//like a post

exports.likePost = async (req, res, next) => {
  try {
    const userId = token.getUserId(req)
    const postId = req.params.id
    const user = await MyDatabase.Like.findOne({
      where: { UserId: userId, PostId: postId },
    })
    if (user) {
      await MyDatabase.Like.destroy(
        { where: { UserId: userId, PostId: postId } },
        { truncate: true, restartIdentity: true }
      )
      res.status(200).send({ messageRetour: "vou n'aimez plus ce post" })
    } else {
      await MyDatabase.Like.create({
        UserId: userId,
        PostId: postId,
      })
      res.status(201).json({ messageRetour: "vous aimez ce post" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//add a comment
exports.addComment = async (req, res) => {
  try {
    const comment = req.body.commentPost
    const pseudo = req.body.commentPseudo
    const newComment = await MyDatabase.Comment.create({
      post: comment,
      pseudo: pseudo,
      UserId: token.getUserId(req),
      PostId: req.params.id,
    })

    res
      .status(201)
      .json({ newComment, message: "commentaire publié" })
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//delete a comment

exports.deleteComment = async (req, res) => {
  try {
    const userId = token.getUserId(req)
    const checkAdmin = await MyDatabase.User.findOne({ where: { id: userId } })
    const comment = await MyDatabase.Comment.findOne({
      where: { id: req.params.id },
    })

    if (userId === comment.UserId || checkAdmin.isAdmin === true) {
      MyDatabase.Comment.destroy(
        { where: { id: req.params.id } },
        { truncate: true }
      )
      res.status(200).json({ message: "commentaire supprimé" })
    } else {
      res.status(401).json({ message: "Vous n'avez pas les droits requis" })
    }
  } catch (error) {
    return res.status(501).send({ error: "Erreur serveur" })
  }
}