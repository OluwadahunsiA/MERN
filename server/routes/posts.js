const express = require('express');
const { getPosts, createPost, updatePost } = require('../contollers/posts');

const router = express.Router();

router.route('/').get(getPosts).post(createPost);

router.route('/:id').patch(updatePost);

module.exports = router;
