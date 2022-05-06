const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage');

exports.getPosts = async (req, res) => {
  const page = req.query.page;
  try {
    const LIMIT = 10;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

exports.getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');
    const post = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });

    res.json({ data: post });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPosts = await PostMessage.create({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });

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

  if (!req.userId) return res.json({ message: 'You are not authenticated' });

  try {
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // const editedPost = { likeCount: post.likeCount + 1 };
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
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
