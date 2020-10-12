const createError = require('http-errors');
const User = require('../models/user');

const logout = (req, res, next) => {
  const {UID} = req.cookies;

  User.findOne({session: UID}).then((user, err) => {
    if (err) {
      return next(createError(500, 'Server error, please try again later...'));
    }

    if (user) {
      user.session = user.session.filter((token) => token !== UID);
      user.save(function(err, _) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        res.cookie('UID', '', {
          httpOnly: true, maxAge: 0, secure: process.env.HTTPS === 'enabled' ? true : false,
        });
        res.send({});
      });
    }

    if (!user) {
      res.send({});
    }
  });
};

module.exports = logout;
