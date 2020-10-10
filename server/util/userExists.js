const createError = require('http-errors');
const User = require('../models/user');

const userExists = async (UID, next) => {
  let user = null;

  if (!UID) {
    next(createError(401, 'Unauthorized'));
    return Promise.resolve(user);
  }

  try {
    user = await User.findOne({session: UID}).exec();
    if (!user) {
      next(createError(401, 'Unauthorized'));
    }
  } catch (err) {
    next(createError(500, 'Server error, please try again later...'));
  }

  return Promise.resolve(user);
};

module.exports = userExists;
