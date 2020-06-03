const createError = require('http-errors');
const Service = require('../models/service');

const getServicesInfo = (req, res, next) => {
  if (req.query.page) {
    Service.findOne({link: req.query.page}, '-_id', function(err, service) {
      if (err) {
        return next(createError(500, 'Server error, please try again later...'));
      }
      if (!service) {
        return next(createError(404, 'Not found!'));
      }
      res.send(service);
    });
  } else {
    Service.find({}, '-_id -full_desc -time', function(err, services) {
      if (err) {
        return next(createError(500, 'Server error, please try again later...'));
      }
      res.send(services);
    });
  }
};

module.exports = getServicesInfo;
