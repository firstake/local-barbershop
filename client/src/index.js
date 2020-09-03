import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from './App';
import configureStore from './store';
import {restoreSession} from './util/restoreSession';

import './index.css';
import './fonts/fonts.css';

const renderApp = (preloadedState) => {
  const store = configureStore(preloadedState);
  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root'),
  );
};

(async () =>
  renderApp(await restoreSession())
)();
