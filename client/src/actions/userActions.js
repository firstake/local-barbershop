import * as API from '../API';
import {userLogout} from './logoutActions';

import {notify} from '../index';
import {withExclamation, capitalize} from '../util';

/* Change User Info */
const changeUserInfo = (name, value) => ({
  type: 'CHANGE_USER_INFO',
  name,
  value,
});

export const fetchChangeUserInfo = (name, value) => (dispatch, getState) => {
  const prevValue = getState().authSuccess.userData[name];

  if (name !== 'password') {
    dispatch(changeUserInfo(name, value));
  }

  API.changeUserInfo({name, value})
      .catch((err) => {
        if (err.status === 401) {
          dispatch(userLogout());
          return notify('Please authorize!');
        }

        notify(
            `${withExclamation(err.statusText) || 'Network error!'} 
           ${capitalize(name)} has not been changed.`,
        );
        dispatch(changeUserInfo(name, prevValue));
      });
};

/* Change User Avatar */
export const fetchChangeUserAvatar = (formData) => (dispatch) => {
  API.upload(formData).then((data) => {
    dispatch(fetchChangeUserInfo('avatar', data.avatar));
  });
};
