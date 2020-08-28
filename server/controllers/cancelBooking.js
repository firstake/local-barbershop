const createError = require('http-errors');

const User = require('../models/user');
const Booking = require('../models/booking');

const cancelBooking = (req, res, next) => {
  const {body, cookies} = req;
  const {date, time} = body;
  const {UID} = cookies;

  if (UID) {
    User.updateOne(
        {access_token: UID},
        {$pull: {
          bookings: {
            date,
            time,
          },
        }},
        function(err) {
          if (err) {
            return next(createError(500, 'Server error, please try again later...'));
          }

          Booking.updateOne(
              {date},
              {$pull: {
                records: {
                  time: +time.split(':')[0],
                },
              }},
              function(err) {
                if (err) {
                  return next(createError(500, 'Server error, please try again later...'));
                }

                res.send({});
              },
          );
        },
    );
  } else {
    return next(createError(401, 'Unauthorized'));
  }
};

module.exports = cancelBooking;
