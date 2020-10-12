const createError = require('http-errors');

const userExists = require('../util/userExists');

const logoutAllSessions = (req, res, next) => {
  const {UID} = req.cookies;

  userExists(UID, next).then((user) => {
    if (user) {
      user.session = user.session.filter((token) => token === UID);
      user.save(function(err, _) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        res.send({});
      });
    }
  });
};

module.exports = logoutAllSessions;
