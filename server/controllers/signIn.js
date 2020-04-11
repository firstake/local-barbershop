const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const createError = require('http-errors');

const USERS_FILE = path.join(__dirname, '../database/users/users.json');
const readFrom = require('../utils/readFromFile');
const writeTo = require('../utils/writeToFile');

const signIn = (req, res, next) => {
  const {email} = req.body;
  const {pass} = req.body;

  readFrom(USERS_FILE)
    .then((data) => {
      const users = JSON.parse(data);
      let userIndex = null;
      const user = users.find((item, index) => {
        if (item.email === email) {
          userIndex = index;
          return true;
        }
      });
      
      if (user) {
        bcrypt.compare(pass, user.password, (compareError, compareResult) => {
          if (compareResult) {
            user.access_token = crypto.randomBytes(48).toString('base64');
            users[userIndex] = user;
            writeTo(USERS_FILE, users);
            
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
