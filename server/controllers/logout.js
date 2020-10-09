const createError = require('http-errors');
const User = require('../models/user');

const logout = (req, res, next) => {
  const {UID} = req.cookies;

  User.findOne({access_token: UID}).then((user, err) => {
      if (err) {
        return next(createError(500, 'Server error, please try again later...'));
      }

      if (user) {
        user.access_token = user.access_token.filter(token => token !== UID);
        user.save(function(err, _) {
          if (err) {
            return next(createError(500, 'Server error, please try again later...'));
          }

          res.cookie('UID', '', {httpOnly: true, maxAge: 0});
          res.send({});
        });
      }
    },
);
};

module.exports = logout;
