const express = require('express');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require('../contollers/posts');

const router = express.Router();

router.route('/').get(getPosts).post(createPost).patch(likePost);

router.route('/:id').patch(updatePost).delete(deletePost);

router.route('/:id/likePost').patch(likePost);

module.exports = router;
