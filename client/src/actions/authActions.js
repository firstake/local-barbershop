import * as API from '../API';

export const authHasErrored = (bool, errorText) => ({
  type: 'AUTH_HAS_ERRORED',
  hasErrored: bool,
  errorText,
});

export const authSuccess = (bool, userData) => ({
  type: 'AUTH_SUCCESS',
  isAuth: bool,
  userData,
});

export const authIsPending = (bool) => ({
  type: 'AUTH_IS_PENDING',
  authIsPending: bool,
});

export const authFetch = (email, pass) => (dispatch) => {
  dispatch(authIsPending(true));

  API.signIn({email, pass}).then((data) => {
    dispatch(authIsPending(false));
    dispatch(authSuccess(true, data));
  }).catch((err) => {
    dispatch(authIsPending(false));
    dispatch(authHasErrored(true, err.statusText || 'Network error!'));
  });
};
