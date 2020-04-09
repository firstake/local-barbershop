import {combineReducers} from 'redux';
import regHasErrored from './regHasErrored';
import authHasErrored from './authHasErrored';
import authSuccess from './authSuccess';

export default combineReducers({
  regHasErrored,
  authHasErrored,
  authSuccess,
});
