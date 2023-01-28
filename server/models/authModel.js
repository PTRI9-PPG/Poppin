const { Schema, model } = require('mongoose');

const AuthSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    googleID: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    }
});

module.exports = model('Auth', AuthSchema);
