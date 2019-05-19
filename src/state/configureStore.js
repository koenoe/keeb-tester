// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';

import createReducer from 'state/reducers.js';
import history from 'utils/history.js';

import type { Store as ReduxStore } from 'redux';

export type Store = ReduxStore<any, any>;

export default function configureStore(initialState: any = {}) {
  let composeEnhancers = compose;
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Array<any> = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.unshift(reduxImmutableStateInvariant());
    composeEnhancers = composeWithDevTools({});
  }

  const store: Store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  // $FlowFixMe
  if (module.hot) {
    module.hot.accept(
      'state/reducers.js',
      (): void => {
        store.replaceReducer(createReducer());
      },
    );
  }

  return store;
}
