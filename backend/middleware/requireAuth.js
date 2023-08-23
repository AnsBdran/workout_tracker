const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports.requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log('=> ', authorization);

  if (!authorization) {
    return res.status(401).json({ error: 'Request is not authorized' });
  }

  const token = authorization.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_PASSWORD);
    console.log('token verify', decodedToken);
    // this line to ensure that the user is store in the database.
    req.user = await User.findOne({ _id: decodedToken.id }).select('_id');
    next();
    console.log('we did it');
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error: 'Request is not authorized' });
  }
};
