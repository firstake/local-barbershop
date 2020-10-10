const createError = require('http-errors');
const userExists = require('../util/userExists');

const changeUserInfo = (req, res, next) => {
  const {cookies, body} = req;
  const {UID} = cookies;
  const {name, value} = body;

  userExists(UID, next).then((user) => {
    if (user) {
      user[name] = value;
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
