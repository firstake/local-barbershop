import * as API from '../API';
import {userLogout} from './logoutActions';

import {notify} from '../index';
import {withExclamation, capitalize} from '../util';

/* Change User Info */
const changeUserInfo = (key, value) => ({
  type: 'CHANGE_USER_INFO',
  key,
  value,
});

export const fetchChangeUserInfo = (key, value) => (dispatch, getState) => {
  const prevValue = getState().authSuccess.userData[key];

  if (key !== 'password') {
    dispatch(changeUserInfo(key, value));
  }

  API.changeUserInfo({key, value})
      .catch((err) => {
        if (err.status === 401) {
          dispatch(userLogout());
          return notify('Please authorize!');
        }

        notify(
            `${withExclamation(err.statusText) || 'Network error!'} 
           ${capitalize(key)} has not been changed.`,
        );
        dispatch(changeUserInfo(key, prevValue));
      });
};

/* Change User Avatar */
export const fetchChangeUserAvatar = (formData) => (dispatch) => {
  API.upload(formData).then((data) => {
    dispatch(fetchChangeUserInfo('avatar', data.avatar));
  });
};
