const express = require('express');
const router = express.Router(); // eslint-disable-line

const getServicesInfo = require('../controllers/getServicesInfo');
const signIn = require('../controllers/signIn');
const register = require('../controllers/register');
const changeUserInfo = require('../controllers/changeUserInfo');
const getBookingDates = require('../controllers/getBookingDates');
const setUserBooking = require('../controllers/setUserBooking');
const cancelBooking = require('../controllers/cancelBooking');
const avatarUpload = require('../controllers/avatarUpload');

router.get('/services', getServicesInfo);
router.get('/get-booking-dates', getBookingDates);

router.post('/sign-in', signIn);
router.post('/register', register);
router.post('/change-user-info', changeUserInfo);
router.post('/set-user-booking', setUserBooking);
router.post('/cancel-booking', cancelBooking);
router.post('/upload', avatarUpload);

module.exports = router;
