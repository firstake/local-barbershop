const path = require('path');
const moment = require('moment');
const createError = require('http-errors');

const BOOKINGS_DATES = path.join(
    __dirname,
    '../database/bookings/booking_dates.json',
);
const readFrom = require('../utils/readFromFile');

const getBookingDates = (req, res, next) => {
  readFrom(BOOKINGS_DATES)
    .then((data) => {
      const bookedDates = JSON.parse(data);
      const nextDays = [];

      const tomorrow = moment().add(1, 'd');
      const week = moment().add(7, 'd');

      let day = tomorrow;

      while (day <= week) {
        nextDays.push(day.format('DD:MM:YYYY'));
        day = day.clone().add(1, 'd');
      }

      const resultDates = [];

      nextDays.forEach((date) => {
        if (bookedDates.hasOwnProperty(date)) {
          if (bookedDates[date].length === 8) {
            return resultDates.push({
              value: date,
              label: date,
              isDisabled: true,
            });
          }

          return resultDates.push({
            value: date,
            label: date,
            time: bookedDates[date],
          });
        }

        resultDates.push({value: date, label: date});
      });

      res.json(resultDates);
    })
    .catch((err) => {
      console.error(err);
      return next(createError(500, 'Server error, please try again later...'));
    });
};

module.exports = getBookingDates;
