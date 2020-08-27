const API_URL = 'http://localhost:3000';

const getReq = (url) => {
  return fetch(`${API_URL}/${url}`);
};

const postReq = (url, bodyData) => {
  return fetch(`${API_URL}/${url}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyData),
  });
};

export const bookingDatesAPI = () => {
  return getReq('api/get-booking-dates')
      .then((res) => res.json());
};

export const serviceAPI = (link) => {
  return getReq(`api/services?page=${link}`)
      .then((res) => res.json());
};

export const servicesAPI = () => {
  return getReq('api/services')
      .then((res) => res.json());
};

export const restoreSessionAPI = () => {
  return getReq('api/restore-session')
      .then((res) => res.json());
};

export const logoutAPI = () => {
  return getReq('api/logout');
};

export const signInAPI = (bodyData) => {
  return postReq('api/sign-in', bodyData)
      .then((res) => res.json());
};

export const registerAPI = (bodyData) => {
  return postReq('api/register', bodyData)
      .then((res) => res.json());
};

export const setBookingAPI = (bodyData) => {
  return postReq('api/set-booking', bodyData);
};

export const cancelBookingAPI = (bodyData) => {
  return postReq('api/cancel-booking', bodyData);
};

export const changeUserInfoAPI = (bodyData) => {
  return postReq('api/change-user-info', bodyData);
};

export const uploadAPI = (formData) => {
  return fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  })
      .then((res) => res.json());
};
