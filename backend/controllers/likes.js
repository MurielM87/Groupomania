const database = require("../models")

//like a post
exports.likePost = async (req, res) => {
  const userId = await database.User.findOne({
    where: { id: req.user.userId }
  })
  console.log("likePost||userId", userId)
  const postId = await database.Post.findOne({
    where: { id: req.params.id }
  })
  console.log("likePost||post", postId)
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
      PostId: postId.id,
      isDislike: true,
    }
  })
  if (!like && dislike) {
    return res.status(401).json({ message: "pas autorisé" })
  } else if (!like && !dislike) {
    await database.Like.create({
      UserId: userId.id,
      PostId: postId.id,
      isLike: true,
    });

    let newPost = await database.Post.findOne({
      where: { id: req.params.id },
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
    console.log("POST.ID", req.params.id)
    return res.status(201).json({ message: "add like", post: newPost });
  } else {
    await database.Like.destroy({
      where: { id: like.id },
    })

    let newPost = await database.Post.findOne({
      where: { id: req.params.id },
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
            },
            {
              model: database.Post,
              attributes: ["id", "title", "content", "imageUrl", "userId"]
            }
          ],
        },
      ],
    })
    console.log("POST.ID", req.params.id)
    return res.status(201).json({ message: "delete like", post: newPost });
  }
},


  //dislike a post
  exports.dislikePost = async (req, res) => {
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
    if (like && !dislike) {
      return res.status(401).json({ message: "impossible" })
    } else if (!dislike && !like) {
      await database.Dislike.create({
        UserId: userId.id,
        PostId: postId.id,
        isDislike: true,
      })
      let newPost = await database.Post.findOne({
        where: { id: req.params.id },
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
              },
              {
                model: database.Post,
                attributes: ["id", "title", "content", "imageUrl", "userId"]
              }
            ],
          },
        ],
      })
      console.log("POST.ID", req.params.id)
      return res.status(201).json({ message: "add dislike", post: newPost });
    } else {
      await database.Dislike.destroy({
        where: { id: dislike.id },
      })
      let newPost = await database.Post.findOne({
        where: { id: req.params.id },
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
              },
              {
                model: database.Post,
                attributes: ["id", "title", "content", "imageUrl", "userId"]
              }
            ],
          },
        ],
      })
      console.log("POST.ID", req.params.id)
      return res.status(201).json({ message: "delete dislike", post: newPost });
    }
  }
