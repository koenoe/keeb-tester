// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';

import history from 'utils/history.js';
import type { Store as ReduxStore } from 'redux';

import rootSaga from './rootSaga.js';
import { initialState } from './state.js';
import createReducer from './reducers.js';

import type { State, Action } from './state.js';

export type Store = ReduxStore<State, Action>;

const sagaMiddleware = createSagaMiddleware<*>({
  onError: (error: Error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  },
});

const sagaFailMiddleware = () => next => (action: Action) => {
  try {
    return next(action);
  } catch (e) {
    setTimeout(() => {
      throw e;
    });
    return action;
  }
};

export default function configureStore(): Store {
  let composeEnhancers = compose;
  const middlewares: Array<any> = [
    sagaMiddleware,
    routerMiddleware(history),
    sagaFailMiddleware,
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.unshift(reduxImmutableStateInvariant());
    composeEnhancers = composeWithDevTools({});
  }

  const store: Store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSaga);

  // $FlowFixMe
  if (module.hot) {
    module.hot.accept('state/reducers.js', (): void => {
      store.replaceReducer(createReducer());
    });
  }

  return store;
}
