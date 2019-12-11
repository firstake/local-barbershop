const path = require("path");
const createError = require("http-errors");

const USERS_FILE = path.join(__dirname, "../json/users/users.json");
const BOOKINGS_DATES = path.join(
  __dirname,
  "../json/bookings/booking_dates.json"
);
const readFrom = require("../utils/readFromFile");
const writeTo = require("../utils/writeToFile");

const setUserBooking = (req, res, next) => {
  readFrom(BOOKINGS_DATES)
    .then(data => {
      const dates = JSON.parse(data);
      if (!dates.hasOwnProperty(req.body.date)) {
        dates[req.body.date] = [];
      }

      dates[req.body.date].push(req.body.time);
      writeTo(BOOKINGS_DATES, dates);
    })
    .catch(err => {
      console.error(err);
      return next(createError(500, "Server error, please try again later..."));
    });

  if (req.body.token !== false) {
    readFrom(USERS_FILE)
      .then(data => {
        const users = JSON.parse(data);
        users.find(item => {
          if (item.token === req.body.token) {
            item.bookings.push({
              date: req.body.date,
              time: `${req.body.time}:00`,
              title: req.body.title,
              link: req.body.link
            });
          }
        });

        writeTo(USERS_FILE, users);
      })
      .catch(err => {
        console.error(err);
        return next(
          createError(500, "Server error, please try again later...")
        );
      });
  }

  res.end();
};

module.exports = setUserBooking;
