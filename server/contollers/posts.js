const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage');

exports.getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json({
      status: 'success',
      data: postMessages,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPosts = await PostMessage.create(post);

    res.status(201).json({
      status: 'success',
      data: { newPosts },
    });
  } catch (err) {
    res.status(409).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.likePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await PostMessage.findById(id);
    const editedPost = { likeCount: post.likeCount + 1 };
    const updatedPost = await PostMessage.findByIdAndUpdate(id, editedPost, {
      new: true,
    });

    res.json(updatedPost);
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Post does not exist');
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.json({
      status: 'success',
      data: updatedPost,
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await PostMessage.findByIdAndDelete(id);

    res.json({
      status: 'success',
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};
