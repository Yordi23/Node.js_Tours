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
        return el === this.password;
      },
      message: 'Passwords does not match'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  // Substracting 1 second will ensure that the token be created after
  // the password has been changed
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//This query middleware applys to all the functions starting with the word find.
userSchema.pre(/^find/, function(next) {
  //This points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// Instance method - This kind of functions will be avaliable in all the objects of the collection
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
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

  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //Adding 10 more minutos (in miliseconds)

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
