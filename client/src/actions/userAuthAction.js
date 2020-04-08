/* Auth */
export const authHasErrored = (bool, errorText) => ({
  type: 'AUTH_HAS_ERRORED',
  hasErrored: bool,
  errorText,
});

export const authSuccess = (bool, userData) => ({
  type: 'AUTH_SUCCESS',
  isAuth: bool,
  userData,
});

export const authFetch = (email, pass) => (dispatch) => {
  fetch('/api/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, pass }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        dispatch(authHasErrored(true, data.err));
      } else {
        dispatch(authSuccess(true, data));
      }
    });
};

/* Register */
export const regHasErrored = (bool, errorText) => ({
  type: 'REG_HAS_ERRORED',
  hasErrored: bool,
  errorText
});

export const regFetch = (email, pass, name, phone) => (dispatch) => {
  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      pass,
      name,
      phone,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        dispatch(regHasErrored(true, data.err));
      } else {
        dispatch(authSuccess(true, data));
      }
    })
};

/* Logout */
export const userLogout = () => ({
  type: 'USER_LOGOUT',
});

/* Bookings */
export const newBooking = (date, time, title, link) => ({
  type: 'NEW_BOOKING',
  date,
  time,
  title,
  link,
});

export const fetchNewBooking = (date, time, title, link, token) => (dispatch) => {
  fetch('/api/set-user-booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      date,
      time,
      title,
      link,
      token,
    }),
  }).then(() => dispatch(newBooking(date, time, title, link)));
};

export const cancelBooking = (date, time) => ({
  type: 'CANCEL_BOOKING',
  date,
  time,
});

export const fetchCancelBooking = (date, time, token) => (dispatch) => {
  fetch('/api/cancel-booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      date,
      time,
      token,
    }),
  }).then(() => dispatch(cancelBooking(date, time)));
};

/* Change User Info */
export const changeUserInfo = (name, value) => ({
  type: 'CHANGE_USER_INFO',
  name,
  value,
});

export const fetchChangeUserInfo = (name, value, token) => (dispatch) => {
  if (name !== 'password') {
    dispatch(changeUserInfo(name, value));
  }

  fetch('/api/change-user-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      value,
      token,
    }),
  });
};

/* Change User Avatar */
export const fetchChangeUserAvatar = (formData, token) => (dispatch) => {
  fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(changeUserInfo('avatar', data.avatar));
      dispatch(fetchChangeUserInfo('avatar', data.avatar, token));
    });
};
