// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history.js';

export default function createReducer(injectedReducers: any = {}) {
  const rootReducer: any = combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
