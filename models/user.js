const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //check if email have already been used

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);