// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history.js';

export default function createReducer() {
  const rootReducer: any = combineReducers({
    router: connectRouter(history),
  });

  return rootReducer;
}
