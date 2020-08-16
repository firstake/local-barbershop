const createError = require('http-errors');

const notFound = (req, res, next) => {
  next(createError(404, 'API route not found'));
};

module.exports = notFound;
