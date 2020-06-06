const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  date: String,
  records: [{
    time: Number,
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    guest_id: {type: Schema.Types.ObjectId, ref: 'Guest'},
    service: String,
  }],
}, {
  versionKey: false,
});

module.exports = mongoose.model('Booking', schema);
