export const restoreSession = async () => {
  const response = await fetch('/api/restore-session');
  const user = await response.json();

  let preloadedState = {};
  if (user.name) {
    preloadedState = {
      authSuccess: {
        isAuth: true,
        userData: user,
      },
    };
  }
  return preloadedState;
};
