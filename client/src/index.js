import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';

import App from './App';
import configureStore from './store';
import {restoreSession, ScrollToTop, checkWebpFeature} from './util';

import './index.scss';
import './fonts/fonts.scss';

const renderApp = (preloadedState) => {
  const store = configureStore(preloadedState);
  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <>
            <ToastContainer
              autoClose={3000}
              hideProgressBar={true}
              draggable={false}
            />
            <ScrollToTop />
            <App />
          </>
        </BrowserRouter>
      </Provider>,
      document.getElementById('root'),
  );
};

(async () => {
  const supportsWebp = await checkWebpFeature('lossy');
  if (!supportsWebp) {
    document.body.classList.add('no-webp');
  }

  renderApp(await restoreSession());
})();

export const notify = (message) => toast.error(message);
