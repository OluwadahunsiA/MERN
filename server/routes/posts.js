const express = require('express');
const { getPosts, createPost } = require('../contollers/posts');

const router = express.Router();

router.route('/').get(getPosts).post(createPost);

module.exports = router;
