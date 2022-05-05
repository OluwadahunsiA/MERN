const express = require('express');
const { signIn, singUp } = require('../contollers/user');

const router = express.Router();

router.route('/signin').post(signIn);
router.route('/signup').post(signUp);

module.exports = router;
