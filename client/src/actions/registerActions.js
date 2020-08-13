import {authSuccess, authIsPending} from './authActions';

export const regHasErrored = (bool, errorText) => ({
  type: 'REG_HAS_ERRORED',
  hasErrored: bool,
  errorText,
});

export const regFetch = (email, pass, name, phone) => (dispatch) => {
  dispatch(authIsPending(true));
  fetch('/api/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email,
      pass,
      name,
      phone,
    }),
  })
      .then((res) => res.json())
      .then((data) => {
        dispatch(authIsPending(false));
        if (data.err) {
          dispatch(regHasErrored(true, data.err));
        } else {
          dispatch(authSuccess(true, data));
        }
      });
};
