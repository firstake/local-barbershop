import {logoutAPI} from '../API';

export const fetchUserLogout = () => (dispatch) => {
  logoutAPI().then(() => {
    dispatch(userLogout());
  });
};

const userLogout = () => ({
  type: 'USER_LOGOUT',
});
