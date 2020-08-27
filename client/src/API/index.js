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

export const bookingDatesApi = () => {
  return getReq('api/get-booking-dates')
      .then((res) => res.json());
};

export const serviceApi = (link) => {
  return getReq(`api/services?page=${link}`)
      .then((res) => res.json());
};

export const servicesApi = () => {
  return getReq('api/services')
      .then((res) => res.json());
};

export const restoreSessionApi = () => {
  return getReq('api/restore-session')
      .then((res) => res.json());
};

export const logoutApi = () => {
  return getReq('api/logout');
};

export const signInApi = (bodyData) => {
  return postReq('api/sign-in', bodyData)
      .then((res) => res.json());
};

export const registerApi = (bodyData) => {
  return postReq('api/register', bodyData)
      .then((res) => res.json());
};

export const setBookingApi = (bodyData) => {
  return postReq('api/set-booking', bodyData);
};

export const cancelBookingApi = (bodyData) => {
  return postReq('api/cancel-booking', bodyData);
};

export const changeUserInfoApi = (bodyData) => {
  return postReq('api/change-user-info', bodyData);
};

export const uploadApi = (formData) => {
  return fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  })
      .then((res) => res.json());
};
