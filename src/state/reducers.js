// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history.js';
import keyboardReducer from './keyboard/reducer.js';

export default function createReducer() {
  const rootReducer: any = combineReducers({
    router: connectRouter(history),
    keyboard: keyboardReducer,
  });

  return rootReducer;
}
