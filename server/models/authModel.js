const { Schema, model } = require('mongoose');

const AuthSchema = new Schema({
  username: {
    type: String,
  },
  googleID: {
    type: String,
  },
  image: {
    type: [String],
  },
  githubID: {
    type: String,
  },
});

module.exports = model('Auth', AuthSchema);
