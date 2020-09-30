import {authSuccess, authIsPending} from './authActions';
import * as API from '../API';

export const regHasErrored = (bool, errorText) => ({
  type: 'REG_HAS_ERRORED',
  hasErrored: bool,
  errorText,
});

export const regFetch = (email, pass, name, phone) => (dispatch) => {
  dispatch(authIsPending(true));

  API.register({
    email,
    pass,
    name,
    phone,
  }).then((data) => {
    dispatch(authIsPending(false));
    dispatch(authSuccess(true, data));
  }).catch((err) => {
    dispatch(authIsPending(false));
    dispatch(regHasErrored(true, err.statusText || 'Network error!'));
  });
};

