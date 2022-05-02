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
