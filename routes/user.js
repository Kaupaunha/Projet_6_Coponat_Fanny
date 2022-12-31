const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const validPassword = require('../middleware/password');
const validEmail = require('../middleware/email');

router.post('/signup', validPassword, validEmail, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;