const path = require('path');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

const USERS_FILE = path.join(__dirname, '../database/users/users.json');
const readFrom = require('../utils/readFromFile');
const writeTo = require('../utils/writeToFile');

const changeUserInfo = (req, res, next) => {
  if (req.body.token != false) {
    readFrom(USERS_FILE)
        .then((data) => {
          const users = JSON.parse(data);

          users.find((item) => {
            if (item.token === req.body.token) {
              switch (req.body.name) {
                case 'password':
                  bcrypt.hash(req.body.value, 10, (hashError, hashResult) => {
                    item.password = hashResult;
                    writeTo(USERS_FILE, users);
                  });
                  break;

                default:
                  item[req.body.name] = req.body.value;
                  writeTo(USERS_FILE, users);
              }
            }
          });
          res.end();
        })
        .catch((err) => {
          console.error(err);
          return next(
              createError(500, 'Server error, please try again later...'),
          );
        });
  }
};

module.exports = changeUserInfo;
