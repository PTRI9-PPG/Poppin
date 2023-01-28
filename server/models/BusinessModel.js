const { Schema, model } = require('mongoose');
// to check the validity or syntactical correctness of a fragment of code or document
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const BusinessSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    minLength: 3,
    maxLength: 30,
    trim: true,
  },
  businessname: {
    type: String,
    required: [true, 'Please provide a business name'],
    minLength: 3,
    maxLength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 6,
    maxLength: 300,
    select: false,
  },
  poppinscore: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Number is not an integer value',
    },
  },
  maxcapacity: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Number is not an integer value',
    },
  },
  currentcapacity: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Number is not an integer value',
    },
  },
  location: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  image: {
    type: String,
  },
  phonenumber: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Number is not an integer value',
    },
  },
  incentive: {
    type: String,
  },
  currentcode: {
    type: String,
  },
  codetouse: {
    type: Array,
  },
  storedcodes: {
    type: Array,
  },
});

BusinessSchema.methods.createJWT = function () {
  const token = jwt.sign(
    {
      userId: this._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME }
  );
  return token;
};

BusinessSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

BusinessSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = model('Business', BusinessSchema);
