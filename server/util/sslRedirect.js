const sslRedirect = (status = 302) => { // 302 to prevent caching
  return (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(status, 'https://' + req.hostname + req.originalUrl);
    }

    return next();
  };
};

module.exports = sslRedirect;
