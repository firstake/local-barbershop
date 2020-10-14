const API_URL = process.env.REACT_APP_API_URL;

const handleErrors = (res) => res.ok ? res : Promise.reject(res);

const getRequest = (url, options) => {
  return fetch(`${API_URL}/${url}`, {
    credentials: 'same-origin',
    ...options,
  })
      .then(handleErrors)
      .then((res) => res.json());
};

const postRequest = (url, bodyData) => {
  return fetch(`${API_URL}/${url}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyData),
  })
      .then(handleErrors)
      .then((res) => res.json());
};

export const getBookingDates = () => {
  return getRequest('api/get-booking-dates');
};

export const getService = (link, options) => {
  return getRequest(`api/services?page=${link}`, options);
};

export const getServices = (options) => {
  return getRequest('api/services', options);
};

export const restoreSession = () => {
  return getRequest('api/restore-session');
};

export const signIn = (bodyData) => {
  return postRequest('api/sign-in', bodyData);
};

export const register = (bodyData) => {
  return postRequest('api/register', bodyData);
};

export const setBooking = (bodyData) => {
  return postRequest('api/set-booking', bodyData);
};

export const cancelBooking = (bodyData) => {
  return postRequest('api/cancel-booking', bodyData);
};

export const changeUserInfo = (bodyData) => {
  return postRequest('api/change-user-info', bodyData);
};

export const upload = (formData) => {
  return fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    credentials: 'same-origin',
    body: formData,
  })
      .then(handleErrors)
      .then((res) => res.json());
};

export const logout = () => {
  return fetch(`${API_URL}/api/logout`, {
    method: 'POST',
    credentials: 'same-origin',
  })
      .then(handleErrors)
      .then((res) => res.json());
};

export const logoutAllSessions = () => {
  return fetch(`${API_URL}/api/logout-all-sessions`, {
    method: 'POST',
    credentials: 'same-origin',
  })
      .then(handleErrors)
      .then((res) => res.json());
};
