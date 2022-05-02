const express = require('express');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../contollers/posts');

const router = express.Router();

router.route('/').get(getPosts).post(createPost);

router.route('/:id').patch(updatePost).delete(deletePost);

module.exports = router;
