const express = require('express');
const router = express.Router();

const profileCtrl = require("../controllers/profile");
const auth = require("../middlewares/auth");
const multerProfile = require("../middlewares/multer-config_profile")

router.get("/profiles", auth, profileCtrl.allProfiles);
router.get("/profiles/:id", auth, profileCtrl.oneProfile);
router.put("/profiles/:id", auth, multerProfile, profileCtrl.modifyProfile);
router.delete("/profiles/:id", auth, profileCtrl.deleteProfile);

module.exports = router;