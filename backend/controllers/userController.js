// const userModel = require('../models/userModel');
const User = require('../models/userModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  console.log('secret', process.env.SECRET_PASSWORD);
  return jwt.sign({ id }, process.env.SECRET_PASSWORD, { expiresIn: '3d' });
};

module.exports = {
  // login a user
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  signup: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.signup(email, password);
      const token = createToken(user._id);
      console.log('token', token);
      res.status(200).json({ email, token });
    } catch (errors) {
      res.status(400).json({ error: errors.message });
    }
  },
};
