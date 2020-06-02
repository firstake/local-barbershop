const bcrypt = require('bcryptjs');
const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  access_token: String,
  name: String,
  phone: String,
  email: String,
  password: String,
  avatar: String,
  bookings: [{
    date: String,
    time: String,
    title: String,
    link: String,
  }],
});

schema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);
