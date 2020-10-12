const crypto = require('crypto');
const createError = require('http-errors');
const User = require('../models/user');
const sessionizeUser = require('../util/sessionizeUser');

const signIn = (req, res, next) => {
  const {email, pass} = req.body;
  const UID = crypto.randomBytes(48).toString('base64');

  User.findOne({email}).then((user, err) => {
    if (err) {
      return next(createError(500, 'Server error, please try again later...'));
    }

    if (user && user.comparePasswords(pass)) {
      user.session.push(UID);
      user.save(function(err, user) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        const sessionUser = sessionizeUser(user);

        res.cookie('UID', UID, {
          httpOnly: true, secure: process.env.HTTPS === 'enabled' ? true : false,
        });
        res.send(sessionUser);
      });
    } else {
      next(createError(401, 'Wrong email or password!'));
    }
  });
};

module.exports = signIn;
