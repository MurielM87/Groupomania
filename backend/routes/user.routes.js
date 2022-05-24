const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/auth.controller.js');
router.post('/signup', userCtrl.signup);

module.exports = router;