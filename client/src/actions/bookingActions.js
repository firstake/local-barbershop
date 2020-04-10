export const newBooking = (date, time, title, link) => ({
  type: 'NEW_BOOKING',
  date,
  time,
  title,
  link,
});

export const fetchNewBooking = (date, time, title, link) => (dispatch) => {
  fetch('/api/set-user-booking', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      date,
      time,
      title,
      link,
    }),
  }).then(() => dispatch(newBooking(date, time, title, link)));
};

export const cancelBooking = (date, time) => ({
  type: 'CANCEL_BOOKING',
  date,
  time,
});

export const fetchCancelBooking = (date, time) => (dispatch) => {
  fetch('/api/cancel-booking', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      date,
      time,
    }),
  }).then(() => dispatch(cancelBooking(date, time)));
};

