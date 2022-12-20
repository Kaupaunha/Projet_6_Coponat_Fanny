const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const validPassword = require('../middleware/password');

router.post('/signup', validPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;