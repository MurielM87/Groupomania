const token = require("../middlewares/auth")
const jwt = require("jsonwebtoken")
const database = require("../models")
const fs = require("fs")

//create a post
exports.createPost = async (req, res) => {   
  //find the user by Id
  const user = await database.User.findOne({
    where : {id : req.user.userId}
  })
  console.log("createPost||user", user)
//  let imageUrl    

  if (user !== null) {
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } else {
      imageUrl = null
    }
    console.log("createPost||req.file", req.file)
    
    // create a post in database
    const post = await database.Post.create({
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.file.filename,
      UserId: req.user.userId,
    })
    console.log("post", post)
    console.log("req.body", req.body)

    res.status(201).json({ post: post, message: "Votre message est publié" })
  } else {
    res.status(400).send({ error: "Erreur, votre message n'a pas pu être publié" })
  } 
}

//get a post
exports.getOnePost = async (req, res) => {
  const id = await database.User.findOne({
    where : {id : req.user.userId}
  })
  console.log("getOnePost||id", id);

    //find the post by Id
  //  try {
    let post = await database.Post.findOne({
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
          attributes: ["content", "postId", "userId"],
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
    console.log("getOnePost||req.params.id", req.params.id);
    console.log("getOnePost||post", post)
//  } catch (error) {
//    return res.status(500).send({ error: "Erreur serveur" })
//  }
}

//get all posts
exports.getAllPosts = async (req, res) => {
    // get all posts from database
    const posts = await database.Post.findAll({
      attributes: ["id", "title", "content", "imageUrl", "createdAt"],
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
          attributes: ["postId", "userId", "id"],
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
}

//get all posts of one user
exports.getAllPostsOfOneUser = async (req, res, next) => {
  //find the user by Id
  const user = await database.User.findOne({
    where : {id : req.user.userId}
  })
  console.log("AllPostsOneUser||user", user)
  console.log("AllPostsOneUser||req.user", req.user)
	
  database.Post.findAll({ 
    where: { userId: req.params.id },
    attributes: ["id", "title", "content", "imageUrl", "createdAt"],
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
          attributes: ["postId", "userId", "id"],
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

//update a post
exports.updatePost = async (req, res) => {
    //find the post by Id
    let newImageUrl
    const userId = await database.User.findOne({
      where : {id : req.user.userId}
    })
    let post = await database.Post.findOne({ 
      where: { id: req.params.id } 
    })

    if (userId === post.UserId) {
      // if a file is in the request
      if (req.file) {
        newImageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename
          }`
        // if an image is already in database
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
      if (req.body.title) {
        post.title = req.body.title
      }
      if (req.body.content) {
        post.content = req.body.content
      }
      post.imageUrl = newImageUrl
      //save in database
      const newPost = await post.save({
        fields: ["title", "content", "imageUrl"],
      })
      res.status(200).json({ newPost: newPost, message: "message modifié" })
    } else {
      res.status(400).json({ message: "Vous n'avez pas l'autorisation" })
    }
}

//delete a post
exports.deletePost = async (req, res) => {
    const userId = await database.User.findOne({
      where : {id : req.user.userId}
    })
    const checkIfAdmin = await database.User.findOne({
      where: { id: req.user.isAdmin },
    })
    const post = await database.Post.findOne({ 
      where: { id: req.params.id } 
    })
    if (userId === post.userId || checkIfAdmin.isAdmin === true) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/images")[1]
        fs.unlink(`images/${filename}`, () => {
          database.Post.destroy({ 
            where: { id: post.id } 
          })
          res.status(200).json({ message: "Post supprimé" })
        })
      } else {
        database.Post.destroy({ 
          where: { id: req.params.id } 
        }, { truncate: true })
        res.status(200).json({ message: "Post supprimé" })
      }
    } else {
      res.status(401).json({ message: "Vous n'avez pas l'autorisation" })
    }
}


//like a post
exports.likePost = async (req, res, next) => {
    const userId = await database.User.findOne({
      where : {id : req.user.userId}
    })
    console.log("likePost||userId", userId)
    const postId = await database.Post.findOne({
      where: {id: req.params.postId}
    })
    console.log("likePost||postId", postId)
    console.log(req.body)
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
}
