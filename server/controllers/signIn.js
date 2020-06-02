const crypto = require('crypto');
const createError = require('http-errors');
const User = require('../models/user');

const signIn = (req, res, next) => {
  const {email, pass} = req.body;
  const access_token = crypto.randomBytes(48).toString('base64');

  User.findOneAndUpdate(
      {email},
      {$set: {access_token}},
      function(err, user) {
        if (err) {
          return next(createError(500, 'Server error!'));
        }

        if (user && user.comparePasswords(pass)) {
          const returnedUser = {
            name: user.name,
            phone: user.phone,
            email: user.email,
            avatar: user.avatar,
            bookings: [...user.bookings],
          };

          res.cookie('UID', access_token, {httpOnly: true});
          res.send(returnedUser);
        } else {
          next(createError(200, 'Wrong email or password!'));
        }
      });
};

module.exports = signIn;
