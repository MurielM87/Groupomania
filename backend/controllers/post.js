const fs = require("fs");
const { Post } = require("../models");

exports.createPost = (req, res) => {
  Post.create({
    UserId: req.auth.userId,
    title: req.body.title,
    content: req.body.content,
  })
    .then(() =>
      res.status(200).json({
        message: "Post créé",
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: "Mauvaise requête: " + err,
      })
    );
};

exports.allPost = (req, res) => {
  Post.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Mauvaise requête :" + err,
      });
    });
};

exports.onePost = (req, res) => {
  Post.findOne()
    .then((post) => {
      // Ajout d'une condition pour gérer l'absence de Post

      if (post == null) {
        res.status(401).json({
          error: "Post non trouvé",
        });
      }
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Mauvaise requête :" + err,
      });
    });
};

exports.modifyPost = (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
  }).then((post) => {
    console.log(post);
    if (post === null) {
      return res.status(401).json({
        error: "Post non trouvé",
      });
    }

    // Comparaison de l'userId pour que seul le propriétaire du post puisse modifier

    if (post.UserId !== req.auth.userId) {
      return res.status(401).json({
        error: "Requête non autorisée",
      });
    }

    // Modification du post (if sans image else avec image)
    if (!req.file) {
      Post.update(
        { ...req.body, id: req.params.id },
        { where: { id: req.params.id } }
      )
        .then(() =>
          res.status(200).json({
            message: "Post modifié",
          })
        )
        .catch((err) =>
          res.status(400).json({
            error: "Mauvaise requête: " + err,
          })
        );
    } else {
      // Modification du post avec une image - efface l'image précédente si celle-ci n'est pas celle par défaut

      if (post.file === null) {
        const postObject = {
          ...req.body,
          file: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };

        Post.update(
          { ...postObject, id: req.params.id },
          { where: { id: req.params.id } }
        )
          .then(() => res.status(200).json({ message: "Post modifié" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (post.file !== null) {
        const filename = post.file.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          console.log("Image supprimée");
        });

        const postObject = {
          ...req.body,
          file: `${req.protocol}://${req.get("host")}/images/${req.file}`,
        };

        Post.update(
          { ...postObject, id: req.params.id },
          { where: { id: req.params.id } }
        )
          .then(() => res.status(200).json({ message: "Post modifié" }))
          .catch((error) => res.status(400).json({ error }));
      }
    }
  });
};

exports.deletePost = (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
  }).then((post) => {
    if (post == null) {
      res.status(404).json({
        error: "Post non trouvé",
      });
    }

    // Comparaison de l'userId pour que seul le propriétaire du post puisse delete

    if (post.UserId !== req.auth.userId) {
      return res.status(401).json({
        error: "Requête non autorisée",
      });
    }

    // Suppression de l'image dans le système de fichiers et de son lien en BDD

    const filename = post.file.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      Post.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then(() => {
          res.status(200).json({
            message: "Post supprimé",
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: "Mauvaise requête :" + err,
          });
        });
    });
  });
};