const mongoose = require('mongoose');
const url = process.env.MONGODB_URL || 'mongodb://localhost:37017/local-barbershop';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = mongoose;
