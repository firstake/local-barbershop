const crypto = require('crypto');
const createError = require('http-errors');
const User = require('../models/user');
const sessionizeUser = require('../util/sessionizeUser');

const register = (req, res, next) => {
  const {name, phone, email, pass: password} = req.body;

  User.findOne({email}, function(err, user) {
    if (err) {
      return next(createError(500, 'Server error, please try again later...'));
    }

    if (user) {
      return next(createError(409, 'This email address already exists!'));
    }

    const access_token = crypto.randomBytes(48).toString('base64'); //eslint-disable-line
    const newUser = new User({
      access_token: [access_token], //eslint-disable-line
      name,
      phone,
      email,
      password,
    });

    newUser.save(function(err, user) {
      if (err) {
        return next(createError(500, 'Server error, please try again later...'));
      }

      const sessionUser = sessionizeUser(user);

      res.cookie('UID', access_token, {httpOnly: true});
      res.send(sessionUser);
    });
  });
};

module.exports = register;
