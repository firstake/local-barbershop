const createError = require('http-errors');

const userExists = require('../util/userExists');

const logoutAllSessions = (req, res, next) => {
  const {UID} = req.cookies;

  userExists(UID, next).then((user) => {
    if (user) {
      const otherSessions = user.session.filter((token) => token !== UID);

      user.session = [UID];
      user.save(function(err, _) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        res.send({});
        otherSessions.forEach((session) => req.app.io.sockets.to(session).emit('logout'));
      });
    }
  });
};

module.exports = logoutAllSessions;
