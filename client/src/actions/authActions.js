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
  isPending: bool,
});

export const authFetch = (email, pass) => (dispatch) => {
  dispatch(authIsPending(true));
  fetch('/api/sign-in', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, pass}),
  })
      .then((res) => res.json())
      .then((data) => {
        dispatch(authIsPending(false));
        if (data.err) {
          dispatch(authHasErrored(true, data.err));
        } else {
          dispatch(authSuccess(true, data));
        }
      });
};
