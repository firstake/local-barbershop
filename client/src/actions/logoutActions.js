import * as API from '../API';

export const logoutIsPending = (bool) => ({
  type: 'LOGOUT_IS_PENDING',
  logoutIsPending: bool,
});

export const fetchUserLogout = () => (dispatch) => {
  dispatch(logoutIsPending(true));

  API.logout().then(() => {
    dispatch(userLogout());
  }).finally(() => {
    dispatch(logoutIsPending(false));
  });
};

const userLogout = () => ({
  type: 'LOGOUT_SUCCESS',
});
