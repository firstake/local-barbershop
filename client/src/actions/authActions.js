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

export const authFetch = (email, pass) => (dispatch) => {
  fetch('/api/sign-in', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, pass}),
  })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          dispatch(authHasErrored(true, data.err));
        } else {
          dispatch(authSuccess(true, data));
        }
      });
};

export const restoreSession = () => (dispatch) => {
  fetch('api/restore-session')
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        dispatch(authSuccess(true, data));
      }
    });
}
