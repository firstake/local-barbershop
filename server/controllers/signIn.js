const path = require('path');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

const USERS_FILE = path.join(__dirname, '../database/users/users.json');
const readFrom = require('../utils/readFromFile');

const signIn = (req, res, next) => {
  const {email} = req.body;
  const {pass} = req.body;

  readFrom(USERS_FILE)
      .then((data) => {
        const users = JSON.parse(data);
        const user = users.find((item) => item.email === email);

        if (user !== undefined) {
          bcrypt.compare(pass, user.password, (compareError, compareResult) => {
            if (compareResult) {
              res.cookie('UID', user.access_token, { httpOnly: true });
              delete user.access_token;
              delete user.password;
              return res.json(user);
            }
            next(createError(200, 'Wrong password!'));
          });
        } else {
          next(createError(200, 'User with that email does not exist!'));
        }
      })
      .catch((err) => {
        console.error(err);
        return next(createError(500, 'Server error, please try again later...'));
      });
};

module.exports = signIn;
