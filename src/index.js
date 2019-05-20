// @flow
import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore from 'state/configureStore.js';
import history from 'utils/history.js';
import App from 'containers/app/app.js';

import type { Store } from 'state/configureStore.js';

const store: Store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  (document.getElementById('root'): any),
);
