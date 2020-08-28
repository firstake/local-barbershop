const createError = require('http-errors');
const User = require('../models/user');

const logout = (req, res, next) => {
  const {UID} = req.cookies;

  User.updateOne(
      {access_token: UID},
      {access_token: ''},
      function(err, result) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        res.cookie('UID', '', {httpOnly: true, maxAge: 0});
        res.send({});
      },
  );
};

module.exports = logout;
