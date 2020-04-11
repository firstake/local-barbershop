export const fetchUserLogout = () => (dispatch) => {
  fetch('/api/logout').then(() => {
    dispatch(userLogout());
  });
};
  
export const userLogout = () => ({
  type: 'USER_LOGOUT',
});
