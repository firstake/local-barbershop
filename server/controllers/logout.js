const path = require('path');
const createError = require('http-errors');

const USERS_FILE = path.join(__dirname, '../database/users/users.json');
const readFrom = require('../utils/readFromFile');
const writeTo = require('../utils/writeToFile');

const logout = (req, res, next) => {
  readFrom(USERS_FILE)
      .then((data) => {
        const users = JSON.parse(data);
        users.forEach((item) => {
          if (item.access_token === req.cookies.UID) {
            item.access_token = '';
            writeTo(USERS_FILE, users);
          }
        });
        res.cookie('UID', '', {httpOnly: true, maxAge: 0});
        res.end();
      })
      .catch((err) => {
        console.error(err);
        return next(createError(500, 'Server error, please try again later...'));
      });
};

module.exports = logout;
