import * as API from '../API';
import {userLogout} from './logoutActions';

import {notify} from '../index';

const newBooking = (date, time, title, link) => ({
  type: 'NEW_BOOKING',
  date,
  time,
  title,
  link,
});

export const fetchNewBooking = (date, time, title, link) => (dispatch) => {
  API.setBooking({
    date,
    time,
    title,
    link,
  }).then(() => dispatch(newBooking(date, time, title, link)));
};

const cancelBooking = (date, time) => ({
  type: 'CANCEL_BOOKING',
  date,
  time,
});

export const fetchCancelBooking = (date, time) => (dispatch) => {
  API.cancelBooking({
    date,
    time,
  }).then(() => dispatch(cancelBooking(date, time)))
      .catch((err) => {
        if (err.status === 401) {
          dispatch(userLogout());
          notify('Please authorize!');
        }
      });
};
