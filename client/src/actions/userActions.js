import * as API from '../API';
import {userLogout} from './logoutActions';

import {notify} from '../index';

/* Change User Info */
const changeUserInfo = (name, value) => ({
  type: 'CHANGE_USER_INFO',
  name,
  value,
});

export const fetchChangeUserInfo = (name, value) => (dispatch) => {
  if (name !== 'password') {
    dispatch(changeUserInfo(name, value));
  }

  API.changeUserInfo({name, value})
      .catch((err) => {
        if (err.status === 401) {
          dispatch(userLogout());
          notify('Please authorize!');
        }
      });
};

/* Change User Avatar */
export const fetchChangeUserAvatar = (formData) => (dispatch) => {
  API.upload(formData).then((data) => {
    dispatch(fetchChangeUserInfo('avatar', data.avatar));
  });
};
