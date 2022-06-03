const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/auth.controller.js');

router.post('/users/signup/').post(userCtrl.signup);
router.post('/users/login.').post(userCtrl.login);

module.exports = router;