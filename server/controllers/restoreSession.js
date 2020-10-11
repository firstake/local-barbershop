const createError = require('http-errors');
const User = require('../models/user');
const sessionizeUser = require('../util/sessionizeUser');

const restoreSession = (req, res, next) => {
  const {UID} = req.cookies;

  User.findOne({session: UID}, function(err, user) {
    if (err) {
      return next(createError(500, 'Server error, please try again later...'));
    }

    if (user) {
      const sessionUser = sessionizeUser(user);
      res.send(sessionUser);
    }

    if (!user) {
      res.send({});
    }
  });
};

module.exports = restoreSession;
