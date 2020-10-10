const mongoose = require('../lib/mongoose');

const User = require('../models/user');
const Guest = require('../models/guest');
const Booking = require('../models/booking');

const setBooking = (req, res, next) => {
  const {body, cookies} = req;
  const {time, date, title, link} = body;
  const {UID} = cookies;

  User.findOneAndUpdate(
      {access_token: UID},
      {$push: {
        bookings: {
          date,
          time: `${time}:00`,
          title,
          link,
        },
      }},
      function(err, user) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        if (user) {
          updateBookingsCollection(
              {date, time, title, user_id: user._id},
              res, next,
          );
        }

        if (!user) {
          bookAsGuest(body, res, next);
        }
      },
  );
};

const bookAsGuest = (params, res, next) => {
  const {
    name,
    phone,
    date,
    time,
    title,
  } = params;

  const guest = new Guest({
    _id: new mongoose.Types.ObjectId(),
    name,
    phone,
  });

  guest.save(function(err) {
    if (err) {
      return next(createError(500, 'Server error, please try again later...'));
    }

    updateBookingsCollection(
        {date, time, title, guest_id: guest._id},
        res, next,
    );
  });
};

const updateBookingsCollection = (params, res, next) => {
  const {date, time, title, user_id, guest_id} = params; //eslint-disable-line

  Booking.updateOne(
      {date},
      {$push: {
        records: {
          time,
          user_id,
          guest_id,
          service: title,
        },
      }},
      {upsert: true},
      function(err) {
        if (err) {
          return next(createError(500, 'Server error, please try again later...'));
        }

        res.send({});
      },
  );
};

module.exports = setBooking;
