const createError = require('http-errors');
const User = require('../models/user');
const sessionizeUser = require('../utils/sessionizeUser');

const restoreSession = (req, res, next) => {
  const {UID} = req.cookies;

  if (UID) {
    User.findOne({access_token: UID}, function(err, user) {
      if (err) {
        return next(createError(500, 'Server error, please try again later...'));
      }

      if (user) {
        const sessionUser = sessionizeUser(user);

        res.send(sessionUser);
      } else {
        res.send({});
      }
    });
  } else {
    res.send({});
  }
};

module.exports = restoreSession;
