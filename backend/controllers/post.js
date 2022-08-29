const token = require("../middlewares/auth")
const database = require("../models")
const fs = require("fs")

//create a post
exports.createPost = (req, res) => {
 
  let imageUrl  
  
  //find the user by Id
  const userId = database.User.findOne({
    attributes: ["pseudo", "id"]
  })
  console.log("createPost||user", userId)
    
  if (userId !== null) {
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } else {
      imageUrl = null
    }
    console.log("createPost||req.file", req.file)
    
    // create a post in database
    const post = database.Post.create({
      include: [
        {
          model: database.User,
          attributes: ["pseudo", "id"],
        },
      ],
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      id: userId,
    })
      console.log("post", post)
      console.log("req.body", req.body)

      res.status(201).json({ post: post, message: "Votre message est publié" })
    } else {
      res.status(400).send({ error: "Erreur, votre message n'a pas pu être publié" })
    }
 
}


//update a post
exports.updatePost = async (req, res) => {
  try {
    //find the post by Id
    let newImageUrl
    const userId = token.getUserId(req)
    let post = await database.Post.findOne({ where: { id: req.params.id } })

    if (userId === post.UserId) {
      // if a file is in the request
      if (req.file) {
        newImageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename
          }`
        // if an image was already in database
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/images")[1]
          // delete it from the "upload" file
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err)
            else {
              console.log(`Deleted file: images/${filename}`)
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
      res.status(200).json({ newPost: newPost, message: "message modifié" })
    } else {
      res.status(400).json({ message: "Vous n'avez pas l'autorisation" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//delete a post
exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserId(req)
    const checkIfAdmin = await database.User.findOne({
      where: { id: userId },
    })
    const post = await database.Post.findOne({ where: { id: req.params.id } })
    if (userId === post.userId || checkIfAdmin.isAdmin === true) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/images")[1]
        fs.unlink(`images/${filename}`, () => {
          database.Post.destroy({ where: { id: post.id } })
          res.status(200).json({ message: "Post supprimé" })
        })
      } else {
        database.Post.destroy({ where: { id: post.id } }, { truncate: true })
        res.status(200).json({ message: "Post supprimé" })
      }
    } else {
      res.status(401).json({ message: "Vous n'avez pas l'autorisation" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}


//get a post
exports.getOnePost = async (req, res) => {
  try {
    //find the user by Id
    const post = await database.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: database.User,
          attributes: ["pseudo", "id"],
        },
        {
          model: database.Like,
          attributes: ["postId", "userId"],
        },
        {
          model: database.Comment,
          order: [["createdAt", "DESC"]],
          attributes: ["content", "pseudo", "UserId"],
          include: [
            {
              model: database.User,
              attributes: ["pseudo"],
            },
          ],
        },
      ],
    })
    res.status(200).json(post)
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // get all posts from database
    const posts = await database.Post.findAll({
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
    res.status(200).send(posts)
  } catch (error) {
    return res.status(500).send({ error: "erreur server " })
  }
}

//get all posts of one user
exports.getAllPostsOfOneUser = (req, res, next) => {
	database.Post.findAll({ 
    where: { userId: req.params.id },
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
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(400).json({ error }));
};

//like a post
exports.likePost = async (req, res, next) => {
  try {
    const userId = token.getUserId(req)
    const postId = req.params.id
    const user = await database.Like.findOne({
      where: { userId: userId, postId: postId },
    })
    if (user) {
      await database.Like.destroy(
        { where: { userId: userId, postId: postId } },
        { truncate: true, restartIdentity: true }
      )
      res.status(200).send({ message: "vous n'aimez plus ce post" })
    } else {
      await database.Like.create({
        userId: userId,
        postId: postId,
      })
      res.status(201).json({ message: "vous aimez ce post" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}
