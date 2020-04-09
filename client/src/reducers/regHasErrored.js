const regHasErrored = (
    state = {hasErrored: false, errorText: ''},
    action,
) => {
  switch (action.type) {
    case 'REG_HAS_ERRORED':
      return {...state, hasErrored: action.hasErrored, errorText: action.errorText};

    default:
      return state;
  }
};

export default regHasErrored;
