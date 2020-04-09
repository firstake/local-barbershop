const path = require('path');
const createError = require('http-errors');

const USERS_FILE = path.join(__dirname, '../database/users/users.json');
const BOOKINGS_DATES = path.join(
    __dirname,
    '../database/bookings/booking_dates.json',
);
const readFrom = require('../utils/readFromFile');
const writeTo = require('../utils/writeToFile');

const cancelBooking = (req, res, next) => {
  if (req.body.token != false) {
    readFrom(USERS_FILE)
        .then((data) => {
          const users = JSON.parse(data);
          users.find((item) => {
            if (item.token === req.body.token) {
              item.bookings.forEach((booking, index) => {
                if (
                  booking.date === req.body.date &&
                booking.time === req.body.time
                ) {
                  item.bookings.splice(index, 1);
                }
              });
            }
          });

          writeTo(USERS_FILE, users);
        })
        .catch((err) => {
          console.error(err);
          return next(
              createError(500, 'Server error, please try again later...'),
          );
        });

    readFrom(BOOKINGS_DATES)
        .then((data) => {
          const bookedDates = JSON.parse(data);
          const newDayTimes = bookedDates[req.body.date].filter(
              (item) => !(item === +req.body.time.split(':')[0]),
          );
          bookedDates[req.body.date] = newDayTimes;

          writeTo(BOOKINGS_DATES, bookedDates);
        })
        .catch((err) => {
          console.error(err);
          return next(
              createError(500, 'Server error, please try again later...'),
          );
        });
  }

  res.end();
};

module.exports = cancelBooking;
