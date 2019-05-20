// @flow
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

export default function App() {
  return (
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
  );
}
