const createError = require('http-errors');
const dbConnected = require('../dbconnect');

const getServicesInfo = (req, res, next) => {
  dbConnected()
      .then((client) => {
        const db = client.db('local-barbershop');
        const collection = db.collection('services');

        if (req.query.page) {
          collection.findOne({
            link: req.query.page,
          },
          {
            projection: {
              _id: 0,
            },
          },
          function(err, results) {
            if (err) {
              return next(createError(500, 'Server error!'));
            }
            if (!results) {
              return next(createError(404, 'Not found!'));
            }
            res.send(results);
          });
        } else {
          collection.find({},
            {
              projection: {
                _id: 0,
                full_desc: 0,
                time: 0,
              },
            })
            .toArray(function(err, results) {
              if (err) {
                return next(createError(500, 'Server error!'));
              }
              res.send(results);
            });
        }
      });
};

module.exports = getServicesInfo;
