import {combineReducers} from 'redux';
import {authHasErrored, regHasErrored, authSuccess} from './userAuthReducer';

export default combineReducers({
  authHasErrored,
  regHasErrored,
  authSuccess,
});
