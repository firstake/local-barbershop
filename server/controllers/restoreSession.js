const createError = require('http-errors');
const User = require('../models/user');

const restoreSession = (req, res, next) => {
  if (req.cookies.UID) {
    User.findOne({access_token: req.cookies.UID}, function(err, user) {
      if (err) {
        return next(createError(500, 'Server error, please try again later...'));
      }

      if (user) {
        const returnedUser = {
          name: user.name,
          phone: user.phone,
          email: user.email,
          avatar: user.avatar,
          bookings: [...user.bookings],
        };

        res.send(returnedUser);
      } else {
        res.send({});
      }
    });
  } else {
    res.send({});
  }
};

module.exports = restoreSession;
