const crypto = require('crypto');
const createError = require('http-errors');
const User = require('../models/user');
const sessionizeUser = require('../util/sessionizeUser');

const signIn = (req, res, next) => {
  const {email, pass} = req.body;
  const access_token = crypto.randomBytes(48).toString('base64'); //eslint-disable-line

  User.findOneAndUpdate(
      {email},
      {$set: {access_token}},
      function(err, user) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        if (user && user.comparePasswords(pass)) {
          const sessionUser = sessionizeUser(user);

          res.cookie('UID', access_token, {httpOnly: true});
          res.send(sessionUser);
        } else {
          next(createError(200, 'Wrong email or password!'));
        }
      });
};

module.exports = signIn;
