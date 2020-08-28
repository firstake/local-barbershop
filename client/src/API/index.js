const API_URL = process.env.REACT_APP_API_URL;

const getRequest = (url) => {
  return fetch(`${API_URL}/${url}`)
      .then((res) => res.json());
};

const postRequest = (url, bodyData) => {
  return fetch(`${API_URL}/${url}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyData),
  }).then((res) => res.json());
};

export const getBookingDates = () => {
  return getRequest('api/get-booking-dates');
};

export const getService = (link) => {
  return getRequest(`api/services?page=${link}`);
};

export const getServices = () => {
  return getRequest('api/services');
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
    body: formData,
  }).then((res) => res.json());
};

export const logout = () => {
  return fetch(`${API_URL}/api/logout`, {
    method: 'POST',
  }).then((res) => res.json());
};
