import {authSuccess, authIsPending} from './authActions';
import {registerAPI} from '../API';

export const regHasErrored = (bool, errorText) => ({
  type: 'REG_HAS_ERRORED',
  hasErrored: bool,
  errorText,
});

export const regFetch = (email, pass, name, phone) => (dispatch) => {
  dispatch(authIsPending(true));

  registerAPI({
    email,
    pass,
    name,
    phone,
  }).then((data) => {
    dispatch(authIsPending(false));

    if (data.err) {
      dispatch(regHasErrored(true, data.err));
    } else {
      dispatch(authSuccess(true, data));
    }
  });
};
