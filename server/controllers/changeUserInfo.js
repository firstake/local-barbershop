const createError = require('http-errors');
const User = require('../models/user');

const changeUserInfo = (req, res, next) => {
  const {cookies, body} = req;
  const {UID} = cookies;

  if (UID) {
    const {name, value} = body;

    User.updateOne(
        {access_token: UID},
        {[name]: value},
        function(err, result) {
          if (err) {
            return next(createError(500, 'Server error, please try again later...'));
          }

          if (result) {
            res.end();
          } else {
            return next(createError(400, 'Bad request'));
          }
        },
    );
  } else {
    return next(createError(401, 'Unauthorized'));
  }
};

module.exports = changeUserInfo;
