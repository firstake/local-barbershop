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
    headers: {'Content-Type': 'application/json'},
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

/* Logout */
export const userLogout = () => ({
  type: 'USER_LOGOUT',
});
