const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const moment = require('moment');

const app = express();

const SERVICES_FILE = path.join(__dirname, '/services/services.json');
const USERS_FILE = path.join(__dirname, 'users/users.json');
const BOOKINGS_DATES = path.join(__dirname, 'bookings/booking_dates.json');

const writeTo = (file, data) => {
  fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

app.set('port', process.env.PORT || 3001);

app.use('/', express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(fileUpload());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

/* Get services info */
app.get('/api/services', (req, res) => {
  let file = SERVICES_FILE;

  if (req.query.page !== undefined) {
    file = path.join(__dirname, `/services/${req.query.page}.json`);
  }

  const stats = fs.stat(file, (err, stats) => {
    if (stats && stats.isFile()) {
      fs.readFile(file, (err, data) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        res.json(JSON.parse(data));
      });
    } else {
      res.status(404).send();
    }
  });
});

/* Sign In */
app.post('/api/sign-in', (req, res) => {
  const { email } = req.body;
  const { pass } = req.body;

  fs.readFile(USERS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const users = JSON.parse(data);

    const user = users.find(
      (item) => item.email === email && item.password === pass,
    );
    if (user !== undefined) {
      delete user.password;
      res.json(user);
    } else {
      res.send(err);
    }
  });
});

/* Register */
app.post('/api/register', (req, res) => {
  fs.readFile(USERS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const users = JSON.parse(data);
    const existingUser = users.find((item) => item.email === req.body.email);

    if (existingUser !== undefined) {
      return res.send(err);
    }

    const newUser = {
      token: Date.now(),
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.pass,
      avatar: 'default.png',
      bookings: [],
    };

    users.push(newUser);
    writeTo(USERS_FILE, users);

    delete newUser.password;
    res.json(newUser);
  });
});

/* Change user info */
app.post('/api/change-user-info', (req, res) => {
  if (req.body.token != false) {
    fs.readFile(USERS_FILE, (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      const users = JSON.parse(data);
      users.find((item) => {
        if (item.token === req.body.token) {
          item[req.body.name] = req.body.value;
        }
      });

      writeTo(USERS_FILE, users);
    });
  }
  res.json();
});

/* Get vacant booking dates */
app.get('/api/get-booking-dates', (req, res) => {
  fs.readFile(BOOKINGS_DATES, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

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

      resultDates.push({ value: date, label: date });
    });

    res.json(resultDates);
  });
});

/* Set user new bookings */
app.post('/api/set-user-booking', (req, res) => {
  fs.readFile(BOOKINGS_DATES, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const dates = JSON.parse(data);
    if (!dates.hasOwnProperty(req.body.date)) {
      dates[req.body.date] = [];
    }

    dates[req.body.date].push(req.body.time);
    writeTo(BOOKINGS_DATES, dates);
  });

  if (req.body.token != false) {
    fs.readFile(USERS_FILE, (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      const users = JSON.parse(data);
      users.find((item) => {
        if (item.token === req.body.token) {
          item.bookings.push({
            date: req.body.date,
            time: `${req.body.time}:00`,
            title: req.body.title,
            link: req.body.link,
          });
        }
      });

      writeTo(USERS_FILE, users);
    });
  }

  res.json();
});

/* Cancel user bookings */
app.post('/api/cancel-booking', (req, res) => {
  if (req.body.token != false) {
    fs.readFile(USERS_FILE, (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      const users = JSON.parse(data);
      users.find((item) => {
        if (item.token === req.body.token) {
          item.bookings.forEach((booking, index) => {
            if (
              booking.date === req.body.date
              && booking.time === req.body.time
            ) {
              item.bookings.splice(index, 1);
            }
          });
        }
      });

      writeTo(USERS_FILE, users);
    });

    fs.readFile(BOOKINGS_DATES, (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      const bookedDates = JSON.parse(data);
      const newDayTimes = bookedDates[req.body.date].filter(
        (item) => !(item === +req.body.time.split(':')[0]),
      );
      bookedDates[req.body.date] = newDayTimes;

      writeTo(BOOKINGS_DATES, bookedDates);
    });
  }

  res.json();
});

/* Avatar upload */
app.post('/upload', (req, res) => {
  const { avatar } = req.files;

  avatar.mv(`${__dirname}/../public/avatars/${req.body.name}.jpg`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ avatar: `${req.body.name}.jpg` });
  });
});

/* Start a server */
app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
