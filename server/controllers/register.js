const crypto = require('crypto');
const createError = require('http-errors');
const User = require('../models/user');

const register = (req, res, next) => {
  const {name, phone, email, pass: password} = req.body;

  User.findOne({email}, function(err, user) {
    if (err) {
      return next(createError(500, 'Server error, please try again later...'));
    }

    if (user) {
      return next(createError(200, 'This email address already exists!'));
    } else {
      const newUser = new User({
        access_token: crypto.randomBytes(48).toString('base64'),
        name,
        phone,
        email,
        password,
        avatar: 'default.png',
        bookings: [],
      });

      newUser.save(function(err, user) {
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

          res.cookie('UID', user.access_token, {httpOnly: true});
          res.send(returnedUser);
        }
      });
    }
  });
};

module.exports = register;
