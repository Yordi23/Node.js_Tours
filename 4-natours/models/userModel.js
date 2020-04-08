const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead_guide', 'admin'],
    default: 'user'
  },
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
    minlength: [8, 'Password must have min 8 characters'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide confirm your password.'],
    validate: {
      //This only works on Create() and Save()
      validator: function(el) {
        return el == this.password;
      },
      message: 'Passwords does not match'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
});

userSchema.pre('save', async function(next) {
  //Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //HAsh the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Instance method - This kind of functions will be avaliable in all the objects of the collection
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  // In normal circunstances we would use this.password instead of passing the password (userPassword)
  // throught parameters. But we cannot, because we the the password's 'select' propertie to false.
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //Adding 10 more minutos (in miliseconds)

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
