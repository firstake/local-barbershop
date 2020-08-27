import {logoutApi} from '../API';

export const fetchUserLogout = () => (dispatch) => {
  logoutApi().then(() => {
    dispatch(userLogout());
  });
};

const userLogout = () => ({
  type: 'USER_LOGOUT',
});
