const API_URL = 'http://localhost:3000';

const getRequest = (url) => {
  return fetch(`${API_URL}/${url}`);
};

const postRequest = (url, bodyData) => {
  return fetch(`${API_URL}/${url}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyData),
  });
};

export const getBookingDates = () => {
  return getRequest('api/get-booking-dates')
      .then((res) => res.json());
};

export const getService = (link) => {
  return getRequest(`api/services?page=${link}`)
      .then((res) => res.json());
};

export const getServices = () => {
  return getRequest('api/services')
      .then((res) => res.json());
};

export const restoreSession = () => {
  return getRequest('api/restore-session')
      .then((res) => res.json());
};

export const logout = () => {
  return getRequest('api/logout');
};

export const signIn = (bodyData) => {
  return postRequest('api/sign-in', bodyData)
      .then((res) => res.json());
};

export const register = (bodyData) => {
  return postRequest('api/register', bodyData)
      .then((res) => res.json());
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
  })
      .then((res) => res.json());
};
