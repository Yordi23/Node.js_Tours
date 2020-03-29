const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  photo: String,
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [8, 'Password must have min 8 characters']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide confirm your password.']
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
