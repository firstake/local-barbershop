const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  link: String,
  img: String,
  title: String,
  short_desc: String,
  full_desc: String,
  price: Number,
  time: Number,
});

module.exports = mongoose.model('Service', schema);
