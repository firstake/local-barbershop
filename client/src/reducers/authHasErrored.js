const authHasErrored = (
    state = {hasErrored: false, errorText: ''},
    action,
) => {
  switch (action.type) {
    case 'AUTH_HAS_ERRORED':
      return {...state, hasErrored: action.hasErrored, errorText: action.errorText};

    default:
      return state;
  }
};

export default authHasErrored;
