const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'user does not exist' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      result: user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.signUp = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: 'user already exists' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    console.log(result);

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      result,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
