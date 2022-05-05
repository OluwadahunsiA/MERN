const express = require('express');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require('../contollers/posts');

const auth = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getPosts).post(auth, createPost).patch(likePost);

router.route('/:id').patch(auth, updatePost).delete(auth, deletePost);

router.route('/:id/likePost').patch(auth, likePost);

module.exports = router;
