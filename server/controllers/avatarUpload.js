const createError = require("http-errors");

const avatarUpload = (req, res, next) => {
  const { avatar } = req.files;

  avatar.mv(`${__dirname}/../../public/avatars/${req.body.name}.jpg`, err => {
    if (err) {
      return next(createError(500, "Server error, please try again later..."));
    }

    res.json({ avatar: `${req.body.name}.jpg` });
  });
};

module.exports = avatarUpload;
