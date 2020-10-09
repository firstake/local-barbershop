const crypto = require('crypto');
const createError = require('http-errors');
const User = require('../models/user');
const sessionizeUser = require('../util/sessionizeUser');

const signIn = (req, res, next) => {
  const {email, pass} = req.body;
  const access_token = crypto.randomBytes(48).toString('base64'); //eslint-disable-line

  User.findOne({email}).then((user, err) => {
    if (err) {
      return next(createError(500, 'Server error, please try again later...'));
    }

    if (user && user.comparePasswords(pass)) {
      user.access_token.push(access_token);
      user.save(function(err, user) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        const sessionUser = sessionizeUser(user);

        res.cookie('UID', access_token, {httpOnly: true});
        res.send(sessionUser);
      });
    } else {
      next(createError(401, 'Wrong email or password!'));
    }
  });
};

module.exports = signIn;
