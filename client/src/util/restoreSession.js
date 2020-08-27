import {restoreSessionAPI} from '../API';

export const restoreSession = async () => {
  const user = await restoreSessionAPI();

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
