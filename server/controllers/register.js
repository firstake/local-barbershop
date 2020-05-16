const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const createError = require('http-errors');

const USERS_FILE = path.join(__dirname, '../database/users/users.json');
const readFrom = require('../utils/readFromFile');
const writeTo = require('../utils/writeToFile');

const register = (req, res, next) => {
  readFrom(USERS_FILE)
      .then((data) => {
        const users = JSON.parse(data);
        const existingUser = users.find((item) => item.email === req.body.email);

        if (existingUser !== undefined) {
          return next(createError(200, 'This email address already exists!'));
        }

        const newUser = {
          access_token: crypto.randomBytes(48).toString('base64'),
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          password: '',
          avatar: 'default.png',
          bookings: [],
        };

        bcrypt.hash(req.body.pass, 10, (hashError, hashResult) => {
          newUser.password = hashResult;

          users.push(newUser);
          writeTo(USERS_FILE, users);

          res.cookie('UID', newUser.access_token, {httpOnly: true});
          delete newUser.access_token;
          delete newUser.password;
          res.json(newUser);
        });
      })
      .catch((err) => {
        console.error(err);
        return next(createError(500, 'Server error, please try again later...'));
      });
};

module.exports = register;
