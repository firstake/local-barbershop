import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {save} from 'redux-localstorage-simple';
import rootReducer from './reducers/index';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const configureStore = (initialState) => (
  createStore(
      rootReducer,
      initialState,
      composeEnhancers(
          applyMiddleware(
              thunk,
              save({states: ['authSuccess.userData'], namespace: 'app'}),
          ),
      ),
  )
);

const store = configureStore();

export default store;
