const express = require('express');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
  commentPost,
} = require('../contollers/posts');

const auth = require('../middleware/auth');

const router = express.Router();

router.route('/search').get(getPostsBySearch);

router.route('/').get(getPosts).post(auth, createPost).patch(likePost);

router
  .route('/:id')
  .get(getPost)
  .patch(auth, updatePost)
  .delete(auth, deletePost);

router.route('/:id/likePost').patch(auth, likePost);
router.route('/:id/commentPost').post(auth, commentPost);

module.exports = router;
