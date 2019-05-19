// @flow
import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Link } from 'react-router-dom';

import configureStore from 'state/configureStore.js';
import history from 'utils/history.js';

const initialState = {};
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              Home: <Link to="/foo">Foo</Link>
            </div>
          )}
        />
        <Route
          exact
          path="/foo"
          render={() => (
            <div>
              Foo: <Link to="/bar">Bar</Link>
            </div>
          )}
        />
        <Route
          exact
          path="/bar"
          render={() => (
            <div>
              Bar: <Link to="/">back to Home</Link>
            </div>
          )}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  (document.getElementById('root'): any),
);
