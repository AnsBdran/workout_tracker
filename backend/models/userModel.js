const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Signup =====================
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error('All fields must be filled!');
  }

  if (!validator.isEmail(email)) {
    throw new Error('please enter a valid email address');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('The password is not strong enough!');
  }

  const doesExist = await this.findOne({ email });

  if (doesExist) {
    throw new Error('This email is already used');
  }

  const user = await this.create({ email, password });

  return user;
};

// login ===========================================
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('All fields must be filled!');
  }

  if (!validator.isEmail(email)) {
    throw new Error('This is not a valid email!');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('The password is not strong enough');
  }

  const user = await this.findOne({ email });
  if (user) {
    const isRightPassword = await bcrypt.compare(password, user.password);
    if (isRightPassword) {
      return user;
    }
    throw new Error('incorrect password');
  }

  throw new Error('This email is not registered');
};

module.exports = mongoose.model('User', userSchema);
