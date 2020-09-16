const authSuccess = (
    state = {isAuth: false, userData: null, authIsPending: false, logoutIsPending: false},
    action,
) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {...state, isAuth: true, userData: action.userData};

    case 'AUTH_IS_PENDING':
      return {...state, authIsPending: action.authIsPending};

    case 'LOGOUT_IS_PENDING':
      return {...state, logoutIsPending: action.logoutIsPending};

    case 'LOGOUT_SUCCESS':
      return {...state, isAuth: false, userData: null};

    case 'NEW_BOOKING':
      return {
        ...state,
        userData: {
          ...state.userData,
          bookings: [
            ...state.userData.bookings,
            {
              date: action.date,
              time: `${action.time}:00`,
              title: action.title,
              link: action.link,
            },
          ],
        },
      };

    case 'CANCEL_BOOKING':
      return {
        ...state,
        userData: {
          ...state.userData,
          bookings: [
            ...state.userData.bookings.filter(
                (item) => !(item.date === action.date && item.time === action.time),
            ),
          ],
        },
      };

    case 'CHANGE_USER_INFO':
      return {
        ...state,
        userData: {
          ...state.userData,
          [action.name]: action.value,
        },
      };

    default:
      return state;
  }
};

export default authSuccess;
