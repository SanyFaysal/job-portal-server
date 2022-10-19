const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: [3, 'Name is too small'],
      maxLength: [100, 'Name is too long'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
      },
      message: 'Please enter a strong password',
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: 'Please confirm your password',
      },
    },
    contactNumber: {
      type: String,
      required: true,
      validate: [
        validator.isMobilePhone,
        'Please provide a valid phone number',
      ],
    },
    dob: {
      type: Date,
      validate: [validator.isDate, 'Please provide a date'],
    },
    bio: String,
    pastExperience: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
      enum: {
        values: ['active', 'in-active', 'blocked'],
        message: "{VALUE} can't be a status",
      },
    },
    role: {
      type: String,
      default: 'candidate',
      enum: {
        values: ['candidate', 'hiring-manager', 'admin'],
        message: "{VALUE} can't be a role",
      },
    },
  },
  {
    timeStamps: true,
  }
);

userSchema.pre('save', function (next) {
  const password = this.password;
  const hash = bcrypt.hashSync(password);
  this.password = hash;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isValidPassword = bcrypt.compareSync(password, hash);
  return isValidPassword;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
