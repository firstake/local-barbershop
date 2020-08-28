import * as API from '../API';

export const fetchUserLogout = () => (dispatch) => {
  API.logout().then(() => {
    dispatch(userLogout());
  });
};

const userLogout = () => ({
  type: 'USER_LOGOUT',
});
