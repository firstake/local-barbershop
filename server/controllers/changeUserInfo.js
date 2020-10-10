const createError = require('http-errors');
const userExists = require('../util/userExists');

const changeUserInfo = (req, res, next) => {
  const {cookies, body} = req;
  const {UID} = cookies;
  const {key, value} = body;

  userExists(UID, next).then((user) => {
    if (user) {
      user[key] = value;
      user.save(function(err, _) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        res.send({});
      });
    }
  });
};

module.exports = changeUserInfo;
