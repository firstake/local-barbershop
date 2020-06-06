const express = require('express');
const router = express.Router(); // eslint-disable-line

const getServicesInfo = require('../controllers/getServicesInfo');
const signIn = require('../controllers/signIn');
const logout = require('../controllers/logout');
const register = require('../controllers/register');
const restoreSession = require('../controllers/restoreSession');
const changeUserInfo = require('../controllers/changeUserInfo');
const getBookingDates = require('../controllers/getBookingDates');
const setBooking = require('../controllers/setBooking');
const cancelBooking = require('../controllers/cancelBooking');
const avatarUpload = require('../controllers/avatarUpload');

router.get('/services', getServicesInfo);
router.get('/get-booking-dates', getBookingDates);
router.get('/restore-session', restoreSession);
router.get('/logout', logout);

router.post('/sign-in', signIn);
router.post('/register', register);
router.post('/change-user-info', changeUserInfo);
router.post('/set-booking', setBooking);
router.post('/cancel-booking', cancelBooking);
router.post('/upload', avatarUpload);

module.exports = router;
