import {changeUserInfoApi, uploadApi} from '../API';

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

  changeUserInfoApi({name, value});
};

/* Change User Avatar */
export const fetchChangeUserAvatar = (formData) => (dispatch) => {
  uploadApi(formData).then((data) => {
    dispatch(fetchChangeUserInfo('avatar', data.avatar));
  });
};
