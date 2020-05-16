const path = require('path');
const createError = require('http-errors');

const USERS_FILE = path.join(__dirname, '../database/users/users.json');
const readFrom = require('../utils/readFromFile');

const restoreSession = (req, res, next) => {
  if (req.cookies.UID) {
    readFrom(USERS_FILE)
        .then((data) => {
          const users = JSON.parse(data);
          const user = users.find((item) => item.access_token === req.cookies.UID);

          if (user) {
            delete user.access_token;
            delete user.password;
            return res.json(user);
          }
          next(createError(200, 'Wrong session!'));
        })
        .catch((err) => {
          console.error(err);
          return next(
              createError(500, 'Server error, please try again later...'),
          );
        });
  } else {
    next(createError(200, 'Session token not found!'));
  }
};

module.exports = restoreSession;
