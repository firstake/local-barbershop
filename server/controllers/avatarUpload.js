const createError = require('http-errors');
const cloudinary = require('cloudinary').v2;

const avatarUpload = (req, res, next) => {
  const {data, mimetype} = req.files.avatar;

  cloudinary.uploader.upload(
      `data:${mimetype};base64,${data.toString('base64')}`,
      function(err, result) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        res.json({avatar: result.secure_url});
      });
};

module.exports = avatarUpload;
