import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/fonts.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import {Provider} from 'react-redux';
import App from './App';

import configureStore from './store';
import {restoreSession} from './util/restoreSession';

const renderApp = (preloadedState) => {
  const store = configureStore(preloadedState);
  ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>,
      document.getElementById('root'),
  );
};

(async () =>
  renderApp(await restoreSession())
)();
