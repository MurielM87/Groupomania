const fs = require("fs");
const { User } = require("../models");

//Get all profiles
exports.allProfiles = (req, res) => {
  User.findAll({

    attributes: {
      exclude: ["password"]
    }
  })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Mauvaise requête :" + err
      });
    });
};

//Get one Profile
exports.oneProfile = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },

    attributes: {
      exclude: ["password"],
    },
  })
    .then((user) => {
    
      if (user == null) {
        res.status(401).json({
          error: "Utilisateur non trouvé",
        });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Mauvaise requête :" + err
      });
    });
};

//Modify a profile
exports.modifyProfile = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  }).then((profile) => {
    if (profile === null) {
      return res.status(401).json({
        error: "Utilisateur non trouvé"
      });
    }

    if (profile.id !== req.auth.userId) {
      return res.status(401).json({
        error: "Requête non autorisée",
      });
    }

    if (!req.file) {
      User.update({ ...req.body, id: req.params.id }, { where: { id: req.params.id } })
      .then(() => res.status(200).json({
        message: "Profil utilisateur modifié"
      }))
      .catch((err) => res.status(400).json({
        error: "Mauvaise requête: " + err
      }))
    } else {

     //modify profile with an image
      const filename = profile.img_profile.split("/images/profiles/")[1];
      fs.unlink(`images/profiles/${filename}`, () => {
        console.log("Image supprimée");
      });

      const profileObject = {
        ...req.body,
        img_profile: `${req.protocol}://${req.get('host')}/images/profiles/${req.file.filename}`,
      };

      User.update(
        
        { ...profileObject, id: req.params.id }, { where: { id: req.params.id }}
      )
        .then(() => res.status(200).json({ message: "Profil utilisateur modifié" }))
        .catch((error) => res.status(400).json({ error }));
    
    }

  });
};

//Delete profile
exports.deleteProfile = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  }).then((profile) => {
    if (profile == null) {
      res.status(404).json({
        error: "Utilisateur non trouvé",
      });
    }
    //auth userId
    if (profile.id !== req.auth.userId) {
      return res.status(401).json({
        error: "Requête non autorisée",
      });
    }

    //delete img

    const filename = profile.img_profile.split("/images/profiles/")[1];
    fs.unlink(`images/profiles/${filename}`, () => {
      User.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then(() => {
          res.status(200).json({
            message: "Utilisateur supprimé",
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: "Mauvaise requête :" + err
          });
        });
    });
  });
};