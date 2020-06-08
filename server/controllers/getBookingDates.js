const moment = require('moment');
const createError = require('http-errors');

const Booking = require('../models/booking');

const getBookingDates = (req, res, next) => {
  Booking.find({}, '-_id', function(err, result) {
    if (err) {
      return next(createError(500, 'Server error, please try again later...'));
    }

    const bookedDates = result.reduce((acc, booking) => {
      acc[booking.date] = booking.records.map((record) => record.time);
      return acc;
    }, {});

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
  });
};

module.exports = getBookingDates;
