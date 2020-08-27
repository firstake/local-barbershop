import {restoreSessionApi} from '../API';

export const restoreSession = async () => {
  const user = await restoreSessionApi();

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
