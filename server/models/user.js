const bcrypt = require('bcryptjs');
const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  access_token: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'avatars/default.png',
  },
  bookings: {
    type: [{
      date: String,
      time: String,
      title: String,
      link: String,
    }],
    default: [],
  },
}, {
  versionKey: false,
});

schema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.pre('save', function() {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

schema.pre('updateOne', function(done) {
  if (this._update.password) {
    this._update.password = bcrypt.hashSync(this._update.password, 10);
  }
  done();
});

module.exports = mongoose.model('User', schema);
