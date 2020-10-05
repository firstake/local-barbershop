const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  phone: String,
}, {
  versionKey: false,
});

module.exports = mongoose.model('Guest', schema);
