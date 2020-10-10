const createError = require('http-errors');

const userExists = require('../util/userExists');
const Booking = require('../models/booking');

const cancelBooking = (req, res, next) => {
  const {body, cookies} = req;
  const {date, time} = body;
  const {UID} = cookies;

  userExists(UID, next).then((user) => {
    if (user) {
      user.bookings = user.bookings.filter((item) => !(item.date === date && item.time === time));
      user.save(function(err, _) {
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
      });
    }
  });
};

module.exports = cancelBooking;
