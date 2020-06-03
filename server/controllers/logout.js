const createError = require('http-errors');
const User = require('../models/user');

const logout = (req, res, next) => {
  User.findOneAndUpdate(
      {access_token: req.cookies.UID},
      {$set: {access_token: ''}},
      function(err, user) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        res.cookie('UID', '', {httpOnly: true, maxAge: 0});
        res.end();
      },
  );
};

module.exports = logout;
