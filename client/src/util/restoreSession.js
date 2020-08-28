import * as API from '../API';

export const restoreSession = async () => {
  const user = await API.restoreSession();

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
